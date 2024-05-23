import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import { Volume1, Volume2 } from "lucide-react";
import { FC, useState } from "react";

interface AudioButtonProps {
  queue: string[];
  className?: string;
}

const AudioButton: FC<AudioButtonProps> = ({ queue, className }) => {
  const [id] = useState<string>(crypto.randomUUID());
  const { currentId, play, stop, isPlaying } = useAudio();

  return (
    <Button
      className={cn(className)}
      size="icon"
      variant="secondary"
      type="button"
      onClick={() => (isPlaying && currentId === id ? stop() : play(queue, id))}
    >
      {isPlaying && currentId === id ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <Volume1 className="w-5 h-5" />
      )}
    </Button>
  );
};

export default AudioButton;
