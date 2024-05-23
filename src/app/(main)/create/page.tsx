"use client";
import Header from "@/components/common/Header";
import { useState } from "react";

import { useCreateTerms } from "@/features/terms/api/сreateTerms";
import { TermFormSchema } from "@/features/terms/types";
import { useRouter } from "next/navigation";
import {
  SetFormSchema,
  SetImportFormSchema,
  SetWithTerms,
} from "@/features/sets/types";
import { useImportSet } from "@/features/sets/api/importSet";
import { useCreateSet } from "@/features/sets/api/createSet";
import SetForm from "@/features/sets/components/SetForm";
import SetImportForm from "@/features/sets/components/SetImportForm";
import FormAlert from "@/components/common/FormAlert";

export default function Create() {
  const router = useRouter();
  const [importedSet, setImportedSet] = useState<SetWithTerms | undefined>(
    undefined
  );

  const { mutate, isPending, isError, error } = useImportSet();

  const {
    mutate: createSetMutate,
    isPending: isCreateSetLoading,
    isError: isCreateSetError,
    error: createSetError,
  } = useCreateSet();

  const onSubmit = (values: SetFormSchema) => {
    createSetMutate(values, {
      onSuccess: ({ id }) => {
        router.push(`/${id}`);
      },
    });
  };

  const onImport = (values: SetImportFormSchema) => {
    mutate(values, {
      onSuccess: (values) => {
        setImportedSet(values);
      },
    });
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-5">
      <Header
        title="Create new study set"
        subtitle="This is test subtitle for the page"
      />
      <FormAlert
        isError={isError}
        error={
          error?.response?.data ?? {
            title: "Error",
            status: 0,
            detail: error?.message,
          }
        }
      />
      <SetImportForm onSubmit={onImport} isLoading={isPending} />
      <FormAlert
        isError={isCreateSetError}
        error={createSetError?.response?.data}
      />
      <SetForm
        onSubmit={onSubmit}
        isLoading={isCreateSetLoading}
        set={importedSet}
        onCancel={onCancel}
      />
    </div>
  );
}
