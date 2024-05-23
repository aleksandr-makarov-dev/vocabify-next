import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AudioContextData = {
  currentId: string;
  isPlaying: boolean;
  play: (queue: string[], id: string) => void;
  stop: () => void;
};

const AudioContext = createContext<AudioContextData | undefined>(undefined);

const AudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentId, setCurrentId] = useState<string>("");
  const [audio, setAudio] = useState<HTMLMediaElement>();
  const [queue, setQueue] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleEnded = () => {
      setQueue((prev) => prev.slice(1));
      setIsPlaying(false);
    };

    if (!isPlaying && queue.length > 0) {
      setIsPlaying(true);

      const newAudio = new Audio(queue[0]);
      newAudio.addEventListener("ended", handleEnded);

      newAudio.play();
      setAudio(newAudio);
    }

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [queue, isPlaying]);

  const play = (audios: string[], id: string) => {
    setCurrentId(id);
    setQueue(audios);
  };

  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setQueue([]);
      setCurrentId("");
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentId: currentId,
        isPlaying: isPlaying,
        play: play,
        stop: stop,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;

export const useAudio = () => {
  const context = useContext<AudioContextData | undefined>(AudioContext);

  if (!context) {
    throw new Error("useAudio should be used within <AudioContext>");
  }

  return context;
};
