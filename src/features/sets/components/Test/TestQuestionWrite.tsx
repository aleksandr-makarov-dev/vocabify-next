import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { QuestionFormSchema } from "../../types";
import { useTest } from "../../providers/TestProvider";
import TermSide from "@/features/terms/components/TermSide";
import TestStateLabel from "./TestStateLabel";
import TestInputWrite from "./TestInputWrite";
import TestExplanation from "./TestExplanation";
import TestQuestionAudio from "./TestQuestionAudio";

interface TestQuestionWriteProps {
  form: UseFormReturn<QuestionFormSchema>;
}

const TestQuestionWrite: FC<TestQuestionWriteProps> = ({ form }) => {
  const { question } = useTest();

  if (!question || question.type !== "write") {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <TestQuestionAudio
        label={<p className="font-medium text-muted-foreground">Definition</p>}
        audio={question.textTts}
      />
      <TermSide text={question.text} image={question.image} />
      <TestStateLabel />
      <TestInputWrite control={form.control} state={question.state} />
      {question.state === "wrong" && (
        <TestExplanation description={question.answer} />
      )}
    </div>
  );
};

export default TestQuestionWrite;
