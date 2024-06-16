import { FC, useRef } from "react";
import AudioButton, {
  AudioButtonHandle,
} from "@/components/common/AudioButton";
import useKeyDown from "@/hooks/useKeyDown";

interface TestAnswerListenProps {
  audio: string;
}

const TestAnswerListen: FC<TestAnswerListenProps> = ({ audio }) => {
  const audioButtonRef = useRef<AudioButtonHandle>(null);

  useKeyDown("ControlLeft", () => {
    audioButtonRef.current?.playAudio();
  });

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-48">
      <p className="text-xl font-medium">Listen to the audio</p>
      <AudioButton ref={audioButtonRef} queue={[audio]} />
    </div>
  );
};

export default TestAnswerListen;
