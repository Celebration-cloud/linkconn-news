import { useEffect, useRef } from "react";

export function useReadingTimer() {
  const readSeconds = useRef(0);
  const startTime = useRef(null);
  const active = useRef(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    startTime.current = performance.now();

    const tick = () => {
      if (!active.current) return;
      const now = performance.now();
      readSeconds.current += (now - startTime.current) / 1000;
      startTime.current = now;
      // optional: log occasionally
      // console.log("Reading:", Math.floor(readSeconds.current), "s");
    };

    intervalRef.current = setInterval(tick, 1000);

    const handleVisibility = () => {
      if (document.hidden) {
        active.current = false;
      } else {
        active.current = true;
        startTime.current = performance.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      // final log
      console.log("Final reading time:", Math.floor(readSeconds.current), "s");
    };
  }, []);

  return readSeconds;
}
