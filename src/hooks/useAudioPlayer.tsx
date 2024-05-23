import { useState, useEffect } from "react";

const useAudioPlayer = (audioQueue: string[]) => {
  const [index, setIndex] = useState<number>(-1);
  const [queue] = useState<string[]>(audioQueue);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (index < 0 || index >= queue.length) return;

    const audioUrl = queue[index];
    const newAudio = new Audio(audioUrl);

    const handleEnded = () => {
      setIsPlaying(false);
      URL.revokeObjectURL(newAudio.src); // To avoid memory leaks
      playNext();
    };

    newAudio.addEventListener("ended", handleEnded);
    newAudio.play();

    setIsPlaying(true);
    setAudio(newAudio);

    return () => {
      newAudio.removeEventListener("ended", handleEnded);
      newAudio.pause();
      newAudio.src = "";
    };
  }, [index, queue]);

  const playNext = () => {
    if (index < queue.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(-1);
    }
  };

  const play = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIndex(0);
    }
  };

  return { isPlaying, play };
};

export default useAudioPlayer;
