"use client";
import { useEffect, useState } from "react";

export const CookieBanner = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setAccepted(false);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 w-full bg-black text-white px-4 py-3 text-sm flex justify-between items-center z-50">
      <span>We use cookies to improve your experience on Linkcon News.</span>
      <button
        onClick={acceptCookies}
        className="ml-4 px-3 py-1 bg-white text-black rounded"
      >
        Accept
      </button>
    </div>
  );
}
