import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ children, className, ...other }) => {
  return (
    <div
      className={cn(
        "border-border rounded-md border p-3 bg-white dark:bg-zinc-800",
        className
      )}
      {...other}
    >
      {children}
    </div>
  );
};

export default Card;
