import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ListProps<T> extends HTMLAttributes<HTMLDivElement> {
  items?: Array<T>;
  render: (item: T) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  loadingView?: React.ReactNode;
  errorView?: React.ReactNode;
  emptyView?: React.ReactNode;
}

const List = <T,>({
  className,
  items,
  render,
  isLoading,
  isError,
  loadingView = null,
  errorView = null,
  emptyView = null,
  ...other
}: ListProps<T>) => {
  if (isLoading) return loadingView;

  if (isError) return errorView;

  if (items?.length === 0) return emptyView;

  return (
    <div className={cn("grid grid-cols-3 gap-5", className)} {...other}>
      {items?.map((item) => render(item))}
    </div>
  );
};

export default List;
