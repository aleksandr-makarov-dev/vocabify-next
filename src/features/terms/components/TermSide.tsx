import { cn } from "@/lib/utils";
import { FC } from "react";

interface TermSideProps {
  text: string;
  image?: string;
}

const TermSide: FC<TermSideProps> = ({ text, image }) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:grid grid-cols-2 gap-x-10 gap-y-2 items-center justify-center min-h-48",
        {
          "sm:flex": !image,
        }
      )}
    >
      <p className="text-2xl text-center">{text}</p>
      {image && (
        <img
          className="w-32 h-32 md:w-48 md:h-48 object-center object-cover rounded-md"
          src={image}
          alt="img"
        />
      )}
    </div>
  );
};

export default TermSide;
