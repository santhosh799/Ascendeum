import { useState, useRef, useCallback, useEffect } from "react";
function useGame({ areaRef }) {
  const [timer, setTimer] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const timerRef = useRef(null);

  const pause = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
    clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    setIsPaused(false);
    setIsRunning(false);
    setReactions([]);
    clearInterval(timerRef.current);
    setStartTime(null);
  }, []);

  const moveObject = useCallback(() => {
    if (areaRef.current && !isPaused) {
      const maxX = areaRef.current.clientWidth - 10;
      const maxY = areaRef.current.clientHeight - 10;

      const left = Math.floor(Math.random() * maxX);
      const top = Math.floor(Math.random() * maxY);
      setPosition({ left, top });
    }
  }, [areaRef.current]);

  const start = useCallback(
    (timer) => {
      setIsRunning(true);
      setIsPaused(false);
      timerRef.current = setInterval(moveObject, timer * 1000);
      setTimer(timer);
      setStartTime(Date.now());
    },
    [moveObject]
  );

  useEffect(() => {
    if (areaRef.current) {
      const object = areaRef.current.querySelector(".object");
      const handleClick = () => {
        if (!isRunning) return;
        const endTime = Date.now();
        const reactionTime = (endTime - startTime) / 1000;
        setReactions((prev) => [...prev, reactionTime]);
        moveObject();
      };
      object.addEventListener("click", handleClick);
      return () => {
        object.removeEventListener("click", handleClick);
      };
    }
  }, [areaRef.current, moveObject, isRunning]);

  useEffect(() => {
    moveObject();
  }, [moveObject]);

  return {
    isRunning,
    isPaused,
    reactions,
    position,
    actions: {
      start,
      pause,
      reset,
    },
  };
}

export default useGame;
