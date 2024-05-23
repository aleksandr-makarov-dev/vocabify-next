import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SetFormSchema } from "../types";
import { ObjectId } from "@/types";
import axios from "@/lib/axios";

const deleteSet = async (values: DeleteSetSchema) => {
  const response = await axios.delete(`/sets/${values.setId}`);
  return response.data;
};

type UseDeleteSetMutation = UseMutationOptions<
  unknown,
  AxiosError,
  DeleteSetSchema,
  unknown[]
>;

type UseDeleteSetOptions = Omit<
  UseDeleteSetMutation,
  "mutationKey" | "mutationFn"
>;

export type DeleteSetSchema = {
  setId: string;
};

export const useDeleteSet = (options?: UseDeleteSetOptions) => {
  return useMutation<unknown, AxiosError, DeleteSetSchema, unknown[]>({
    mutationKey: ["sets", "delete"],
    mutationFn: async (values) => {
      return await deleteSet(values);
    },
    ...options,
  });
};
