import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Paged } from "@/types";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import { HTMLAttributes } from "react";

interface InfiniteListProps<T> extends HTMLAttributes<HTMLDivElement> {
  items?: InfiniteData<Paged<T>>;
  render: (item: T) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  loadingView?: React.ReactNode;
  errorView?: React.ReactNode;
  emptyView?: React.ReactNode;
}

const InfiniteList = <T,>({
  className,
  items,
  render,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  loadingView = null,
  errorView = null,
  emptyView = null,
  ...other
}: InfiniteListProps<T>) => {
  if (isLoading) return loadingView;

  if (isError) return errorView;

  if (items?.pages.length === 0 && !isLoading) return emptyView;

  return (
    <div className="space-y-5">
      <div className={cn("grid grid-cols-3 gap-5", className)} {...other}>
        {items?.pages?.map((page, i) => (
          <React.Fragment key={`page-${i}`}>
            {page.items?.map((item) => render(item))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && loadingView}
      <div
        className={cn("flex justify-center", {
          hidden: isFetchingNextPage || !hasNextPage,
        })}
      >
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      </div>
    </div>
  );
};

export default InfiniteList;
