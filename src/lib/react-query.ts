import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const queryClientOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryClientOptions,
});
