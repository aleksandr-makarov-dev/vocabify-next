import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import { Volume1, Volume2 } from "lucide-react";

interface AudioButtonProps {
  queue: string[];
  className?: string;
}

export interface AudioButtonHandle {
  playAudio: () => void;
}

const AudioButton = forwardRef<AudioButtonHandle, AudioButtonProps>(
  ({ queue, className }, ref) => {
    const [id] = useState<string>(crypto.randomUUID());
    const { currentId, play, isPlaying } = useAudio();

    useImperativeHandle(ref, () => ({
      playAudio: () => play(queue, id),
    }));

    return (
      <Button
        className={cn(className)}
        size="icon"
        variant="secondary"
        type="button"
        onClick={() =>
          isPlaying && currentId === id ? stop() : play(queue, id)
        }
      >
        {isPlaying && currentId === id ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <Volume1 className="w-5 h-5" />
        )}
      </Button>
    );
  }
);

AudioButton.displayName = "AudioButton";

export default AudioButton;
