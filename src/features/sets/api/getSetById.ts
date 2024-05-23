import { Set } from "@/features/sets/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "@/lib/axios";

const getSetById = async (values: UseSetByIdParams) => {
  const response = await axios.get<Set>(`/sets/${values.id}`);
  return response.data;
};

type UseSetByIdParams = {
  id: string;
};

type UseSetByIdQuery = UseQueryOptions<Set, AxiosError, Set, unknown[]>;

type UseSetByIdOptions = Omit<UseSetByIdQuery, "queryKey" | "queryFn">;

export const useSetById = (
  values: UseSetByIdParams,
  options?: UseSetByIdOptions
) => {
  return useQuery<Set, AxiosError, Set, unknown[]>({
    queryKey: ["sets", "setId", values],
    queryFn: async () => {
      return await getSetById(values);
    },
    ...options,
  });
};
