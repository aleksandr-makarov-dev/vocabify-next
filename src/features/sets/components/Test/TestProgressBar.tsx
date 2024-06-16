import { FC } from "react";
import { useTest } from "../../providers/TestProvider";

const TestProgressBar: FC = () => {
  const { index, total } = useTest();

  return (
    <div className="text-center">
      <p>
        Question <span className="font-medium text-2xl">{index + 1}</span> of{" "}
        {total}
      </p>
    </div>
  );
};

export default TestProgressBar;
