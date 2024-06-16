import { Button } from "@/components/ui/button";
import { FC } from "react";
import { QuestionType, useTest } from "../../providers/TestProvider";
import { Headphones, MousePointerClick, NotebookPen } from "lucide-react";

const TestStartScreen: FC = () => {
  const { state, start, setQuestionType } = useTest();

  if (state !== "start") {
    return null;
  }

  const onClick = (type: QuestionType) => {
    setQuestionType(type);
    start();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Button
        className="flex flex-col gap-1.5 h-auto py-8"
        onClick={() => onClick("write")}
      >
        <NotebookPen className="w-8 h-8" />
        <p>Write</p>
      </Button>
      <Button
        className="flex flex-col gap-1.5 h-auto py-8"
        onClick={() => onClick("choose")}
      >
        <MousePointerClick className="w-8 h-8" />
        <p>Select</p>
      </Button>
      <Button
        className="flex flex-col gap-1.5 h-auto py-8"
        onClick={() => onClick("listen")}
      >
        <Headphones className="w-8 h-8" />
        <p>Listen</p>
      </Button>
    </div>
  );
};

export default TestStartScreen;
