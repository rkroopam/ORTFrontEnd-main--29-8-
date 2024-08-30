import { useState, useEffect } from "react";

const useCountdownTimer = (initialTime: number, onComplete: () => void) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          onComplete(); // Trigger the onComplete callback
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onComplete]);

  return time;
};

export default useCountdownTimer;
