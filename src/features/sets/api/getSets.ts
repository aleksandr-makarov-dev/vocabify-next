import { Set } from "@/features/sets/types";
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { Paged, ProblemDetails } from "@/types";

const getSets = async (params: UseSetParams) => {
  const response = await axios.get<Paged<Set>>("/sets", {
    params: params,
  });
  return response.data;
};

type UseSetsQuery = UseQueryOptions<
  Paged<Set>,
  AxiosError<ProblemDetails>,
  Paged<Set>,
  unknown[]
>;

type UseSetsOptions = Omit<UseSetsQuery, "queryKey" | "queryFn">;

type UseSetParams = {
  search?: string | null;
  page?: number;
};

export const useSets = (params: UseSetParams, options?: UseSetsOptions) => {
  return useQuery<
    Paged<Set>,
    AxiosError<ProblemDetails>,
    Paged<Set>,
    unknown[]
  >({
    queryKey: ["sets", params],
    queryFn: async () => {
      return await getSets(params);
    },
    ...options,
  });
};

type UseInfiniteSetsQuery = UseInfiniteQueryOptions<
  Paged<Set>,
  Error,
  InfiniteData<Paged<Set>, unknown>,
  (string | UseSetParams)[],
  any
>;

type UseInfiniteSetsOptions = Omit<
  UseInfiniteSetsQuery,
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>;

export const useInfiniteSets = (
  params: UseSetParams,
  _options?: UseInfiniteSetsOptions
) => {
  return useInfiniteQuery<
    Paged<Set>,
    AxiosError<ProblemDetails>,
    InfiniteData<Paged<Set>, unknown>,
    (string | UseSetParams)[],
    number
  >({
    queryKey: ["sets", "infinite", params],
    queryFn: async ({ pageParam }) => {
      return await getSets({ ...params, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasNext ? last.page + 1 : undefined),
  });
};
