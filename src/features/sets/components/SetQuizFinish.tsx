import { FC } from "react";
import { Button } from "@/components/ui/button";
import useKeyDown from "@/hooks/useKeyDown";

interface SetQuizFinishProps {
  correct: number;
  total: number;
  restart: () => void;
}

const SetQuizFinish: FC<SetQuizFinishProps> = ({ correct, total, restart }) => {
  useKeyDown("Enter", () => restart());

  return (
    <div className="flex flex-col space-y-5 grow items-center justify-center">
      <div className="text-center space-y-3">
        <h5 className="text-2xl font-medium">Congratulations!</h5>
        <p className="text-lg">
          You got {correct} out of {total} questions correct
        </p>
      </div>
      <Button onClick={restart}>Try again</Button>
    </div>
  );
};

export default SetQuizFinish;
