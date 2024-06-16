import { FC, useEffect, useRef } from "react";
import { useTest } from "../../providers/TestProvider";
import TestProgressBar from "./TestProgressBar";
import TestQuestionSelect from "./TestQuestionSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionFormSchema } from "../../schemas";
import { QuestionFormSchema } from "../../types";
import { Form } from "@/components/ui/form";
import TestFooter from "./TestFooter";
import useKeyDown from "@/hooks/useKeyDown";
import TestQuestionWrite from "./TestQuestionWrite";
import TestQuestionListen from "./TestQuestionListen";

const TestProgressScreen: FC = () => {
  const { state, check, next, question } = useTest();

  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      answer: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useKeyDown("Enter", () => {
    if (question?.state === "idle") {
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    } else {
      next();
    }
  });

  useEffect(() => {
    if (question?.state === "idle") {
      form.reset();
    }
  }, [question?.state]);

  const onSubmit = (values: QuestionFormSchema) => {
    check(values.answer);
  };

  if (state !== "progress") {
    return null;
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TestProgressBar />
        <TestQuestionSelect form={form} />
        <TestQuestionWrite form={form} />
        <TestQuestionListen form={form} />
        <TestFooter />
      </form>
    </Form>
  );
};

export default TestProgressScreen;
