import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { HTMLAttributes, FC } from "react";

interface LoadingViewProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

const LoadingView: FC<LoadingViewProps> = ({
  title,
  subtitle,
  className,
  ...other
}) => {
  return (
    <div
      className={cn("flex flex-col items-center py-10", className)}
      {...other}
    >
      <Loader2 className="w-10 h-10 animate-spin" />
      <div className="text-center">
        <h5 className="font-semibold text-lg">
          {title ?? "Please wait for a while"}
        </h5>
        <p className="text-gray-700">{subtitle ?? "Loading..."}</p>
      </div>
    </div>
  );
};

export default LoadingView;
