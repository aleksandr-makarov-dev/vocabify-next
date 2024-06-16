"use client";
import { FC } from "react";
import TestProvider from "../../providers/TestProvider";
import { Term } from "@/features/terms/types";
import TestStartScreen from "./TestStartScreen";
import TestProgressScreen from "./TestProgressScreen";
import TestFinishScreen from "./TestFinishScreen";

interface SetTestProps {
  data?: Term[];
}

const SetTest: FC<SetTestProps> = ({ data }) => {
  if (!data) return <p>No Data</p>;

  return (
    <TestProvider set={data}>
      <TestStartScreen />
      <TestProgressScreen />
      <TestFinishScreen />
    </TestProvider>
  );
};

export default SetTest;
