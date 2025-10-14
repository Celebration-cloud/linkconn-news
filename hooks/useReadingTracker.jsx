import { useEffect, useRef, useState } from "react";

export function useReadingTracker(article, userId = "guest") {
  const [analytics, setAnalytics] = useState(null);
  const start = useRef(Date.now());
  const sent = useRef(false);

  useEffect(() => {
    if (!article?.$id) return;

    const deviceType = /Mobi|Android/i.test(navigator.userAgent)
      ? "mobile"
      : /Tablet/i.test(navigator.userAgent)
        ? "tablet"
        : "desktop";

    let completed = false;

    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom) completed = true;
    };

    const sendData = async (final = false) => {
      if (sent.current && !final) return;
      sent.current = true;

      const duration = Math.round((Date.now() - start.current) / 1000);
      if (duration < 10) return; // skip quick visits

      const readLocation =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";

      const payload = {
        articleId: article.$id,
        userId,
        readDuration: duration,
        completed,
        deviceType,
        readLocation,
      };

      const url = "/api/public/article-read";

      try {
        if (navigator.sendBeacon && final) {
          const blob = new Blob([JSON.stringify(payload)], {
            type: "application/json",
          });
          navigator.sendBeacon(url, blob);
        } else {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            const data = await res.json();
            setAnalytics(data);
          } else {
            console.error("❌ Failed to send read data:", res.status);
          }
        }
      } catch (err) {
        console.error("⚠️ Reading tracker error:", err);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", () => sendData(true));
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendData(true);
    });

    return () => {
      sendData(true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", () => sendData(true));
      window.removeEventListener("visibilitychange", () => sendData(true));
    };
  }, [article?.$id, userId]);

  return analytics;
}
