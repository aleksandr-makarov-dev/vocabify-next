import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useTest } from "../../providers/TestProvider";

const TestFinishScreen: FC = () => {
  const { state, correct, total, finish } = useTest();

  if (state !== "finish") {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-48">
      <h5 className="text-2xl font-medium">Congratulations!</h5>
      <p className="text-lg my-3">
        You got {correct} out of {total} questions correct
      </p>
      <Button type="button" onClick={finish}>
        Restart
      </Button>
    </div>
  );
};

export default TestFinishScreen;
