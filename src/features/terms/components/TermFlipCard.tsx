"use client";
import { FC, useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import Card from "@/components/common/Card";
import AudioButton, {
  AudioButtonHandle,
} from "@/components/common/AudioButton";
import TermSide from "./TermSide";
import useKeyDown from "@/hooks/useKeyDown";

interface TermFlipCardProps {
  text: string;
  definition: string;
  textTtsUrl?: string;
  definitionTtsUrl?: string;
  image?: string;
  isActive: boolean;
}

const TermFlipCard: FC<TermFlipCardProps> = ({
  text,
  definition,
  image,
  textTtsUrl,
  definitionTtsUrl,
  isActive,
}) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const { transform } = useSpring({
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const audioButtonRef = useRef<AudioButtonHandle>(null);

  useKeyDown("Space", () => {
    if (isActive) {
      setFlipped((prev) => !prev);
    }
  });

  useKeyDown("ControlLeft", () => {
    if (isActive) {
      audioButtonRef.current?.playAudio();
    }
  });

  return (
    <a.div
      className="cursor-pointer w-full h-96"
      style={{
        transform,
        rotateX: flipped ? "180deg" : "0deg",
      }}
    >
      <Card className="w-full h-full">
        {flipped ? (
          definitionTtsUrl && (
            <AudioButton
              ref={audioButtonRef}
              className="absolute z-10 top-5 right-5"
              queue={[`https://quizlet.com/${definitionTtsUrl}`]}
            />
          )
        ) : (
          <AudioButton
            ref={audioButtonRef}
            className="absolute z-10 top-5 right-5"
            queue={[`https://quizlet.com/${textTtsUrl}`]}
          />
        )}
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setFlipped((prev) => !prev)}
        >
          {flipped ? (
            <TermSide text={definition} image={image} />
          ) : (
            <TermSide text={text} />
          )}
        </div>
      </Card>
    </a.div>
  );
};

export default TermFlipCard;
