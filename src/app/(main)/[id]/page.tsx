"use client";
import Card from "@/components/common/Card";
import List from "@/components/common/List";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useTerms } from "@/features/terms/api/getTerms";
import TermContent from "@/features/terms/components/TermContent";
import Header from "@/components/common/Header";
import TermFlipCard from "@/features/terms/components/TermFlipCard";
import { useSetById } from "@/features/sets/api/getSetById";
import { useParams } from "next/navigation";
import SetToolbar from "@/features/sets/components/SetToolbar";
import LoadingView from "@/components/common/LoadingView";
import { useEffect } from "react";

export default function Details() {
  const { id } = useParams<{ id: string }>();

  const { data: set, isLoading, isError, error } = useSetById({ id: id });
  const { data: terms, isLoading: isTermsLoading } = useTerms({ setId: id });

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="space-y-5">
      <Header title={set?.title} subtitle={set?.description} />
      <SetToolbar setId={id} />
      <Carousel>
        <CarouselContent>
          {terms?.map((item) => (
            <CarouselItem key={item.id}>
              <TermFlipCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
