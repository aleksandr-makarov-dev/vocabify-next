"use client";
import Header from "@/components/common/Header";
import Search, { SearchFormSchema } from "@/components/common/Search";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import InfiniteSetsList from "@/features/sets/components/InfiniteSetsList";

export default function Library() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = (values: SearchFormSchema) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", values.search);
    router.push(pathname + "?" + params.toString());
  };

  const onReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    window.history.replaceState(null, "", pathname + "?" + params.toString());
  };

  return (
    <div className="space-y-10">
      <Header
        title="Learn study sets"
        subtitle="This is test subtitle for the page"
      />
      <div className="space-y-5">
        <Search
          value={searchParams.get("search") ?? undefined}
          placeholder="Finnish 101..."
          onSubmit={onSubmit}
          onReset={onReset}
        />
        <InfiniteSetsList />
      </div>
    </div>
  );
}
