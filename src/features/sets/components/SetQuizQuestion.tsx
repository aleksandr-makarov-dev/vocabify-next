import { FC, useRef, useState } from "react";
import { Question } from "./SetQuiz";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TermSide from "@/features/terms/components/TermSide";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QuestionFormSchema } from "../types";
import { questionFormSchema } from "../schemas";
import { Form } from "@/components/ui/form";
import QuestionSelect from "./QuestionSelect";
import QuestionInput from "./QuestionInput";
import useKeyDown from "@/hooks/useKeyDown";
import AudioButton from "@/components/common/AudioButton";

export type QuestionState = "idle" | "correct" | "wrong" | "skip";

interface QuestionStateLabelProps {
  state: QuestionState;
}

const QuestionStateLabel: FC<QuestionStateLabelProps> = ({ state }) => {
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const isSkipped = state === "skip";
  const isIdle = state === "idle";

  return (
    <Label
      className={cn(
        "text-base",
        isCorrect && "text-green-600",
        isWrong && "text-red-600"
      )}
    >
      {isIdle
        ? "Give your answer:"
        : isCorrect
        ? "Congratulations, your answer is correct!"
        : isSkipped
        ? "Give this one a try later!"
        : "Not quite, you are still learning!"}
    </Label>
  );
};

interface QuestionFormFooterProps {
  state: QuestionState;
  changeQuestion: () => void;
  skipQuestion: () => void;
}

const QuestionFormFooter: FC<QuestionFormFooterProps> = ({
  state,
  changeQuestion,
  skipQuestion,
}) => {
  return (
    <div className="text-end">
      {state !== "idle" ? (
        <Button type="button" onClick={changeQuestion}>
          Continue
        </Button>
      ) : (
        <div className="space-x-3">
          <Button variant="ghost" type="button" onClick={skipQuestion}>
            Don&apos;t know?
          </Button>
          <Button>Answer</Button>
        </div>
      )}
    </div>
  );
};

interface SetQuizQuestionProps {
  question?: Question;
  checkAnswer: (answer: string) => boolean;
  changeQuestion: () => void;
}

const SetQuizQuestion: FC<SetQuizQuestionProps> = ({
  question,
  checkAnswer,
  changeQuestion,
}) => {
  const [state, setState] = useState<QuestionState>("idle");

  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      answer: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useKeyDown("ArrowRight", () => {
    onSkip();
  });

  useKeyDown("Enter", () => {
    if (state === "idle") {
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }

    if (state !== "idle") {
      onChange();
    }
  });

  const onSubmit = (values: QuestionFormSchema) => {
    const isCorrect = checkAnswer(values.answer);
    setState(isCorrect ? "correct" : "wrong");
  };

  const onChange = () => {
    setState("idle");
    form.reset();
    changeQuestion();
  };

  const onSkip = () => {
    setState("skip");
  };

  if (!question) {
    return null;
  }

  return (
    <div className="space-y-5 w-full">
      <div className="flex items-center gap-3">
        <p className="font-medium text-muted-foreground">Definition</p>
        <AudioButton
          queue={[`https://quizlet.com/${question.term.definitionTtsUrl}`]}
        />
      </div>
      <TermSide text={question.term.definition} image={question.term.image} />
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <QuestionStateLabel state={state} />
          {question.type === "multiple-choice" ? (
            <QuestionSelect
              control={form.control}
              options={question.addition}
              state={state}
              setValue={form.setValue}
            />
          ) : (
            <>
              <QuestionInput control={form.control} state={state} />
              {(state === "wrong" || state === "skip") && (
                <p>The correct answer: {question.answer}</p>
              )}
            </>
          )}
          <QuestionFormFooter
            state={state}
            changeQuestion={onChange}
            skipQuestion={onSkip}
          />
        </form>
      </Form>
    </div>
  );
};

export default SetQuizQuestion;
