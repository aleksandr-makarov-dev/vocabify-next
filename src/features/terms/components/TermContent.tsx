import AudioButton from "@/components/common/AudioButton";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface TermContentProps {
  text: string;
  definition?: string;
  image?: string | null;
  textTtsUrl?: string;
  definitionTtsUrl?: string | null;
}

const TermContent: FC<TermContentProps> = ({
  text,
  definition,
  image,
  textTtsUrl,
  definitionTtsUrl,
}) => {
  return (
    <div className="flex space-x-3 items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-x-3 gap-y-2">
        <Label className="font-normal text-muted-foreground">Text</Label>
        <p className="font-medium sm:order-1">{text}</p>
        <Label className="font-normal text-muted-foreground">Definition</Label>
        <p className="font-medium sm:order-2">{definition}</p>
      </div>
      <AudioButton
        className="shrink-0"
        queue={[textTtsUrl, definitionTtsUrl]
          .filter((v) => !!v)
          .map((v) => `https://quizlet.com/${v}`)}
      />
      <img
        src={image ?? "placeholder.png"}
        className="shrink-0 w-16 h-16 object-center object-cover rounded-md"
      />
    </div>
  );
};

export default TermContent;
