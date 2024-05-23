"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { useDeleteSet } from "../api/deleteSet";
import { useRouter } from "next/navigation";

interface SetToolbarProps {
  setId: string;
  termsCount: number;
}

const SetToolbar: FC<SetToolbarProps> = ({ setId, termsCount }) => {
  const { mutate } = useDeleteSet();
  const router = useRouter();

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete set?")) {
      mutate(
        { setId: setId },
        {
          onSuccess: () => {
            router.replace("/library");
          },
        }
      );
    }
  };

  return (
    <nav className="flex flex-col sm:grid grid-cols-4 gap-3">
      <Button disabled={termsCount < 4} variant="default" asChild>
        <Link href={`/${setId}/test`}>Test</Link>
      </Button>
      <Button variant="destructive" onClick={onDelete}>
        Delete
      </Button>
    </nav>
  );
};

export default SetToolbar;
