"use client";
import Card from "@/components/common/Card";
import List from "@/components/common/List";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";
import { useTerms } from "@/features/terms/api/getTerms";
import TermContent from "@/features/terms/components/TermContent";
import Header from "@/components/common/Header";
import TermFlipCard from "@/features/terms/components/TermFlipCard";
import { useSetById } from "@/features/sets/api/getSetById";
import { useParams } from "next/navigation";
import SetToolbar from "@/features/sets/components/SetToolbar";
import LoadingView from "@/components/common/LoadingView";
import { useState, useEffect } from "react";
import useKeyDown from "@/hooks/useKeyDown";

export default function Details() {
  const { id } = useParams<{ id: string }>();

  const { data: set, isLoading, isError, error } = useSetById({ id: id });
  const { data: terms, isLoading: isTermsLoading } = useTerms({ setId: id });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useKeyDown("ArrowRight", () => {
    if (api?.canScrollNext) {
      api.scrollNext();
    }
  });

  useKeyDown("ArrowLeft", () => {
    if (api?.canScrollPrev) {
      api.scrollPrev();
    }
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="space-y-5">
      <Header title={set?.title} subtitle={set?.description} />
      <SetToolbar termsCount={terms?.length ?? 0} setId={id} />
      <Carousel setApi={setApi}>
        <CarouselContent>
          {terms?.map((item, i) => (
            <CarouselItem key={item.id}>
              <TermFlipCard {...item} isActive={i + 1 === current} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <h5 className="text-xl font-medium">Terms ({terms?.length})</h5>
      <List
        className="flex flex-col gap-3"
        items={terms}
        isLoading={isTermsLoading}
        render={(item) => (
          <Card key={item.id}>
            <TermContent {...item} />
          </Card>
        )}
      />
    </div>
  );
}
