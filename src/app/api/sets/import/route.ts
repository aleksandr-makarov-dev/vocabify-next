import { NextRequest, NextResponse } from "next/server";
import {
  DehydratedReduxStateKey,
  ProblemDetails,
  QuizletResponse,
  QuizletSetModel,
  SetModel,
  StudiableItem,
  Term,
} from "@/types";
import { Problem } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  if (!file) {
    return Problem(
      400,
      "No files received",
      "No files were received in the request."
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert the Buffer to a string
  const fileContent = buffer.toString("utf8");

  try {
    const pattern =
      /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/;
    const match = pattern.exec(fileContent);

    if (match) {
      console.log("Pattern found...");
      const jsonData = match[1];
      console.log("Parsing data...");

      const response: QuizletResponse = JSON.parse(jsonData);

      if (!response?.props.pageProps.dehydratedReduxStateKey) {
        return Problem(500, "Import Error", "Failed to import from Quizlet.");
      }

      const dehydratedReduxStateKey: DehydratedReduxStateKey = JSON.parse(
        response.props.pageProps.dehydratedReduxStateKey
      );

      if (!dehydratedReduxStateKey) {
        return Problem(500, "Import Error", "Failed to import from Quizlet.");
      }

      console.log("Returning result...");

      const set = mapQuizletSetToSet(dehydratedReduxStateKey.setPage.set);
      const terms =
        dehydratedReduxStateKey.studyModesCommon.studiableData.studiableItems.map(
          (si) => mapStudiableItemToTerm(si) // Assuming set.id is available
        );

      const result: SetModel = {
        title: set.title,
        description: set.description,
        textLang: set.textLang,
        definitionLang: set.definitionLang,
        image: set.image,
        terms: terms,
      };

      return NextResponse.json(result, { status: 201 });
    } else {
      return Problem(
        500,
        "Pattern Not Found",
        "The expected pattern was not found in the file content."
      );
    }
  } catch (error) {
    console.log("Error occurred", error);
    return Problem(500, "Processing Error", "Failed to process the file.");
  }
}

function mapQuizletSetToSet(set: QuizletSetModel): SetModel {
  return {
    title: set.title,
    description: set.description,
    textLang: set.wordLang,
    definitionLang: set.defLang,
    image: set.thumbnailUrl,
  };
}

function mapStudiableItemToTerm(item: StudiableItem): Term {
  return {
    text: item.cardSides[0]?.media[0]?.plainText || "",
    definition: item.cardSides[1]?.media[0]?.plainText || "",
    image: item.cardSides[1]?.media[1]?.url,
    textTtsUrl: item.cardSides[0]?.media[0]?.ttsUrl,
    definitionTtsUrl: item.cardSides[1]?.media[0]?.ttsUrl,
    setId: "",
  };
}
