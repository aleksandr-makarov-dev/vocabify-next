import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FC } from "react";

interface TestExplanationProps {
  description: string;
}

const TestExplanation: FC<TestExplanationProps> = ({ description }) => {
  return (
    <Alert className="border-green-600 text-green-600 bg-green-50 [&>svg]:text-green-600 dark:border-green-800 dark:bg-green-900 dark:text-white">
      <AlertTitle>Explanation:</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default TestExplanation;
