"use client";
import { useTerms } from "@/features/terms/api/getTerms";
import _ from "lodash";
import LoadingView from "@/components/common/LoadingView";
import FormAlert from "@/components/common/FormAlert";
import { useParams } from "next/navigation";
import SetQuiz from "@/features/sets/components/SetQuiz";

const Test = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useTerms({ setId: id! });

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <FormAlert isError={isError} error={error.response?.data} />;
  }

  if (data && data.length < 4) {
    return (
      <FormAlert
        isError={true}
        error={{
          status: 400,
          title: "Error while creating test",
          detail: "The minimal number of terms to create test is 4",
        }}
      />
    );
  }

  return <SetQuiz data={data} />;
};

export default Test;
