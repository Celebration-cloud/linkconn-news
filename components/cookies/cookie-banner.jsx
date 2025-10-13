/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useEffect, useState } from "react";

export const CookieBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "true") setAccepted(true);
  }, []);

  const acceptCookies = async () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
    await fetch("/api/public/cookies/init", { method: "POST" });
  };

  if (!mounted || accepted) return null; // ensures it only renders client-side

  return (
    <div className="fixed bottom-20 w-full bg-black text-white px-4 py-3 text-sm flex justify-between items-center z-50">
      <span>We use cookies to improve your experience on Linkcon News.</span>
      <button
        onClick={acceptCookies}
        className="ml-4 px-3 py-1 bg-white text-black rounded"
      >
        Accept
      </button>
    </div>
  );
};
