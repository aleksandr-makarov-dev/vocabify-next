import AudioButton, {
  AudioButtonHandle,
} from "@/components/common/AudioButton";
import useKeyDown from "@/hooks/useKeyDown";
import { FC, useRef } from "react";

interface TestQuestionListenProps {
  label?: React.ReactNode;
  audio?: string;
}

const TestQuestionAudio: FC<TestQuestionListenProps> = ({ label, audio }) => {
  const audioButtonRef = useRef<AudioButtonHandle>(null);

  useKeyDown("ControlLeft", () => {
    audioButtonRef.current?.playAudio();
  });

  return (
    <div className="flex items-center gap-3">
      {label}
      {audio && (
        <AudioButton
          ref={audioButtonRef}
          queue={[`https://quizlet.com/${audio}`]}
        />
      )}
    </div>
  );
};

export default TestQuestionAudio;
