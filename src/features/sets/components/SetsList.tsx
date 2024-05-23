import List from "@/components/common/List";
import { FC, HTMLAttributes } from "react";
import { useSets } from "../api/getSets";
import SetCard from "./SetCard";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import FormAlert from "@/components/common/FormAlert";
import SetsEmptyView from "./SetsEmptyView";
import LoadingView from "@/components/common/LoadingView";

interface SetsListPros extends HTMLAttributes<HTMLDivElement> {}

const SetsList: FC<SetsListPros> = ({ className, ...other }) => {
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError, error } = useSets({
    search: searchParams.get("search"),
  });

  return (
    <List
      className={cn("flex flex-col sm:grid sm:grid-cols-2 gap-10", className)}
      items={data?.items}
      isLoading={isLoading}
      isError={isError}
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

export default SetsList;
