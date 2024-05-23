import { SetWithTerms } from "@/features/sets/types";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ProblemDetails } from "@/types";

const importSet = async (values: ImportSetParams) => {
  var formData = new FormData();
  formData.append("file", values.file);

  const response = await axios.post<SetWithTerms>(`/sets/import`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

type ImportSetParams = {
  file: File;
};

type UseImportSetMutation = UseMutationOptions<
  SetWithTerms,
  AxiosError<ProblemDetails>,
  ImportSetParams,
  unknown[]
>;

type UseImportSetOptions = Omit<
  UseImportSetMutation,
  "mutationKey" | "mutationFn"
>;

export const useImportSet = (options?: UseImportSetOptions) => {
  return useMutation<
    SetWithTerms,
    AxiosError<ProblemDetails>,
    ImportSetParams,
    unknown[]
  >({
    mutationKey: ["sets", "import"],
    mutationFn: async (values) => {
      return await importSet(values);
    },
    ...options,
  });
};
