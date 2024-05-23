import { useEffect } from "react";

type Handler = () => void;

const useKeyDown = (key: string, handler: Handler) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [key, handler]);
};

export default useKeyDown;
