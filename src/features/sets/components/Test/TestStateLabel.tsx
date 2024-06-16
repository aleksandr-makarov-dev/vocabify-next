import { Label } from "@/components/ui/label";
import { FC } from "react";
import { useTest } from "../../providers/TestProvider";
import { cn } from "@/lib/utils";

const TestStateLabel: FC = () => {
  const { question } = useTest();

  const isCorrect = question?.state === "correct";
  const isWrong = question?.state === "wrong";
  const isIdle = question?.state === "idle";

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
        : "Not quite, you are still learning!"}
    </Label>
  );
};

export default TestStateLabel;
