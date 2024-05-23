import { useEffect, useState, useRef, useCallback } from "react";

type Handler = () => void;

const useKeyDown = (key: string, handler: Handler) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
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
