import TermSide from "@/features/terms/components/TermSide";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTest } from "../../providers/TestProvider";
import { QuestionFormSchema } from "../../types";
import TestExplanation from "./TestExplanation";
import TestInputWrite from "./TestInputWrite";
import TestQuestionAudio from "./TestQuestionAudio";
import TestStateLabel from "./TestStateLabel";
import TestAnswerListen from "./TestAnswerListen";

interface TestQuestionListenProps {
  form: UseFormReturn<QuestionFormSchema>;
}

const TestQuestionListen: FC<TestQuestionListenProps> = ({ form }) => {
  const { question } = useTest();

  if (!question || question.type !== "listen") {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <TestAnswerListen audio={`https://quizlet.com/${question.answerTts}`} />
      <TestStateLabel />
      <TestInputWrite control={form.control} state={question.state} />
      {question.state === "wrong" && (
        <TestExplanation description={question.answer} />
      )}
    </div>
  );
};

export default TestQuestionListen;
