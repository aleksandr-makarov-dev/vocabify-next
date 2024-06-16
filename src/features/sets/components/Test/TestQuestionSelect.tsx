import { FC } from "react";
import { useTest } from "../../providers/TestProvider";
import TermSide from "@/features/terms/components/TermSide";
import TestInputSelect from "./TestInputSelect";
import { UseFormReturn } from "react-hook-form";
import { QuestionFormSchema } from "../../types";
import TestStateLabel from "./TestStateLabel";
import TestQuestionAudio from "./TestQuestionAudio";

interface TestQuestionSelectProps {
  form: UseFormReturn<QuestionFormSchema>;
}

const TestQuestionSelect: FC<TestQuestionSelectProps> = ({ form }) => {
  const { question } = useTest();

  if (!question || question.type !== "choose") {
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
      {question.options && (
        <TestInputSelect
          control={form.control}
          setValue={form.setValue}
          options={question.options}
          state={question.state}
          givenAnswer={question.givenAnswer}
        />
      )}
    </div>
  );
};

export default TestQuestionSelect;
