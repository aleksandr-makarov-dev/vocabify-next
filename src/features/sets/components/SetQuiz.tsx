import Card from "@/components/common/Card";
import { Term } from "@/features/terms/types";
import _ from "lodash";
import { FC, useRef, useState } from "react";
import SetQuizStart, { SelectTypesForm } from "./SetQuizStart";
import SetQuizQuestion from "./SetQuizQuestion";
import SetQuizFinish from "./SetQuizFinish";
import { clearText } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";

export type Question = {
  term: Term;
  addition: any;
  answer: string;
  type: string;
};

type QuizState = "idle" | "progress" | "finished";

interface SetQuizProps {
  data?: Term[];
}

const SetQuiz: FC<SetQuizProps> = ({ data }) => {
  const [value, setValue] = useLocalStorage<string[] | undefined>(
    "question-types",
    undefined
  );
  const [shuffledTerms, setShuffledTerms] = useState<Term[]>(_.shuffle(data));
  const [answers, setAnswers] = useState<number>(0);

  const [index, setIndex] = useState<number>(-1);
  const [question, setQuestion] = useState<Question | undefined>();
  const questionTypes = useRef<string[]>([]);

  const [state, setState] = useState<QuizState>("idle");

  const getOptions = (term: Term) => {
    return _.shuffle([
      ..._.shuffle(data)
        .filter((t) => t.id !== term.id)
        .slice(0, 3)
        .map((t) => ({ value: t.text, isCorrect: false })),
      { value: term.text, isCorrect: true },
    ]);
  };

  const changeQuestion = () => {
    const nextIndex = index + 1;

    if (nextIndex > shuffledTerms.length - 1) {
      setState("finished");
    } else {
      const nextTerm = shuffledTerms[nextIndex];

      const type =
        questionTypes.current[
          Math.floor(Math.random() * questionTypes.current.length)
        ];

      const newQuestion: Question = {
        term: nextTerm,
        type: type,
        answer: nextTerm.text,
        addition: type === "multiple-choice" ? getOptions(nextTerm) : null,
      };

      setIndex(nextIndex);
      setQuestion(newQuestion);
    }
  };

  const onStart = (values: SelectTypesForm) => {
    questionTypes.current = values.items;
    setValue(values.items);
    setIndex(-1);
    changeQuestion();
    setState("progress");
  };

  const onCheckAnswer = (answer: string): boolean => {
    if (!question) {
      return false;
    }

    const isCorrect =
      clearText(question.answer).trim().toLowerCase() ===
      clearText(answer).trim().toLowerCase();

    if (isCorrect) {
      setAnswers((prev) => prev + 1);
    }

    return isCorrect;
  };

  const onRestart = () => {
    setState("idle");
    setShuffledTerms(_.shuffle(data));
  };

  return (
    <Card className="min-h-[28rem] flex p-5">
      {state === "idle" && <SetQuizStart types={value} onSubmit={onStart} />}
      {state === "progress" && (
        <SetQuizQuestion
          question={question}
          checkAnswer={onCheckAnswer}
          changeQuestion={changeQuestion}
        />
      )}
      {state === "finished" && (
        <SetQuizFinish
          correct={answers}
          total={data?.length ?? 0}
          restart={onRestart}
        />
      )}
    </Card>
  );
};

export default SetQuiz;
