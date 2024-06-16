import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useTest } from "../../providers/TestProvider";

const TestFooter: FC = () => {
  const { question, next } = useTest();

  if (!question) {
    return null;
  }

  return (
    <div className="text-end">
      {question.state !== "idle" ? (
        <Button
          className="w-full md:w-auto"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
        >
          Continue
        </Button>
      ) : (
        <Button className="w-full md:w-auto">Answer</Button>
      )}
    </div>
  );
};

export default TestFooter;
