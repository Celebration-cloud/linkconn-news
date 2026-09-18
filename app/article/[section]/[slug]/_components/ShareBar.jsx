/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import { showToast } from "@/utils/toast";
import { Check, Copy, MessageCircle, Send, Share2 } from "lucide-react";

export default function ShareBar({ title, slug }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined"
      ? window.location.href
      : `https://www.linkconnews.com/article/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      showToast({
        title: "Link copied to clipboard",
        color: "success",
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const shareSocial = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {/* Copy link button */}
      <button
        onClick={copyLink}
        className="flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 text-xs font-semibold text-[var(--ink)] transition-all hover:bg-[var(--surface-raised)] active:scale-95"
        title="Copy article link"
      >
        {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="size-4" />}
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>

      {/* Twitter / X */}
      <button
        onClick={() =>
          shareSocial(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`
          )
        }
        className="grid size-11 place-items-center rounded-lg border border-[var(--line)] text-[var(--ink-muted)] transition hover:bg-[var(--surface-raised)] active:scale-95"
        title="Share on X"
      >
        <Share2 className="size-4" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={() =>
          shareSocial(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`
          )
        }
        className="grid size-11 place-items-center rounded-lg border border-[var(--line)] text-[var(--ink-muted)] transition hover:bg-[var(--surface-raised)] active:scale-95"
        title="Share on LinkedIn"
      >
        <Send className="size-4" />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() =>
          shareSocial(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + getUrl())}`
          )
        }
        className="grid size-11 place-items-center rounded-lg border border-[var(--line)] text-[var(--ink-muted)] transition hover:bg-[var(--surface-raised)] active:scale-95"
        title="Share on WhatsApp"
      >
        <MessageCircle className="size-4" />
      </button>
    </div>
  );
}
