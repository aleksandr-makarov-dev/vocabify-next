import { FC, HTMLAttributes } from "react";
import { useInfiniteSets } from "../api/getSets";
import SetCard from "./SetCard";
import { cn } from "@/lib/utils";
import FormAlert from "@/components/common/FormAlert";
import SetsEmptyView from "./SetsEmptyView";
import LoadingView from "@/components/common/LoadingView";
import InfiniteList from "@/components/common/InfiniteList";
import { useSearchParams } from "next/navigation";

interface InfiniteSetsListPros extends HTMLAttributes<HTMLDivElement> {}

const InfiniteSetsList: FC<InfiniteSetsListPros> = ({
  className,
  ...other
}) => {
  const searchParams = useSearchParams();

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteSets({
    search: searchParams.get("search"),
  });

  return (
    <InfiniteList
      fetchNextPage={fetchNextPage}
      className={cn("flex flex-col sm:grid sm:grid-cols-2 gap-10", className)}
      items={data}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      emptyView={<SetsEmptyView />}
      loadingView={<LoadingView subtitle="Loading sets..." />}
      errorView={
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
      }
      render={(item) => <SetCard key={item.id} {...item} />}
      {...other}
    />
  );
};

export default InfiniteSetsList;
