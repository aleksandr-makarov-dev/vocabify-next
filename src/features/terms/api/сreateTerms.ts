import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ObjectId, ProblemDetails } from "@/types";
import axios from "@/lib/axios";
import { TermsListFormSchema } from "../types";

const createTerms = async (
  values: TermsListFormSchema
): Promise<ObjectId[]> => {
  const response = await axios.post<ObjectId[]>("/terms/bulk", values);
  return response.data;
};

type UseCreateTermsMutation = UseMutationOptions<
  ObjectId[],
  AxiosError<ProblemDetails>,
  TermsListFormSchema,
  unknown[]
>;

type UseCreateSetOptions = Omit<
  UseCreateTermsMutation,
  "mutationKey" | "mutationFn"
>;

export const useCreateTerms = (options?: UseCreateSetOptions) => {
  return useMutation<
    ObjectId[],
    AxiosError<ProblemDetails>,
    TermsListFormSchema,
    unknown[]
  >({
    mutationKey: ["terms", "create"],
    mutationFn: async (values) => {
      return await createTerms(values);
    },
    ...options,
  });
};
