import { useState, useEffect, useCallback, useRef } from "react";

const useLessonCountdownTimer = (initialTime: number, onComplete: () => void) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store the interval ID

  const startTimer = useCallback(() => {
    setIsActive(true);
    setTime(initialTime);
  }, [initialTime]);

  const stopTimer = useCallback(() => {
    setTime(0)
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsActive(false);
  }, []);

  const runTimer = useCallback(() => {
    intervalIdRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          stopTimer();
          onComplete(); // Trigger the onComplete callback
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [onComplete, stopTimer]);

  useEffect(() => {
    if (isActive) {
      runTimer();
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isActive, runTimer]);

  return { time, startTimer, stopTimer };
};

export default useLessonCountdownTimer;
