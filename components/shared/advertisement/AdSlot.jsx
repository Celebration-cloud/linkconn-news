/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";
import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight, Newspaper, RadioTower } from "lucide-react";


const adPresets = {
  hero: {
    width: "w-full md:w-[728px]",
    height: "h-[90px]",
    label: "Advertisement — 728x90",
  },
  inline: {
    width: "w-full min-[720px]:w-[300px]",
    height: "h-[250px]",
    label: "Ad — 300x250",
  },
  leaderboard: {
    width: "w-full md:w-[970px]",
    height: "h-[250px]",
    label: "Leaderboard Ad — 970x250",
  },
  side: {
    width: "w-full md:w-[160px]",
    height: "h-[600px]",
    label: "Side Ad — 160x600",
  },
};

const adCreatives = {
  top: {
    image: "/ads/linkcon-advertise.svg",
    href: "/advertise",
    eyebrow: "Linkcon for brands",
    title: "Put your campaign inside the daily briefing",
    cta: "Explore advertising",
    alt: "Abstract blue Linkcon advertising artwork",
    icon: RadioTower,
  },
  inline: {
    image: "/ads/linkcon-latest.svg",
    href: "/latest",
    eyebrow: "Live newsroom",
    title: "The latest verified dispatches, in one place",
    cta: "Read the latest",
    alt: "Layered editorial pages representing Linkcon latest news",
    icon: Newspaper,
  },
  bottom: {
    image: "/ads/linkcon-top-news.svg",
    href: "/top-news",
    eyebrow: "Editor selected",
    title: "Catch up on the stories shaping the day",
    cta: "View top news",
    alt: "Blue global signal artwork representing Linkcon top stories",
    icon: RadioTower,
  },
};

export const AdSlot = ({
  type = "hero",
  placement = "top",
  width,
  height,
  label,
  className = "",
  children,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const preset = adPresets[type];
  const creative = adCreatives[placement] || adCreatives.top;
  const CreativeIcon = creative.icon;

  const adWidth = width || preset?.width || "w-full md:w-[300px]";
  const adHeight = height || preset?.height || "h-[250px]";
  const adLabel = label || preset?.label || "Advertisement";

  if (children) {
    return <section className={`my-8 flex justify-center ${className}`}>{children}</section>;
  }

  return (
    <aside className={`my-7 flex justify-center px-3 min-[375px]:px-4 ${className}`} aria-label={adLabel}>
      <NextLink
        href={creative.href}
        className={`${adWidth} ${adHeight} ${type === "inline" ? "min-h-[250px]" : "min-h-[112px] sm:min-h-[90px]"} group relative isolate flex overflow-hidden rounded-2xl border border-blue-300/30 bg-[#071a3a] text-white shadow-[0_18px_50px_rgba(8,50,115,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_58px_rgba(8,50,115,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
      >
        {!imageFailed && (
          <Image
            src={creative.image}
            alt={creative.alt}
            fill
            sizes={type === "inline" ? "(max-width: 719px) calc(100vw - 32px), 300px" : "(max-width: 767px) calc(100vw - 24px), 728px"}
            className="absolute inset-0 -z-10 object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className={`flex w-full ${type === "inline" ? "flex-col items-start justify-end p-6" : "items-center justify-between gap-3 p-4 sm:px-6"}`}>
          <div className="min-w-0">
            <span className="mb-1 flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-blue-100">
              <CreativeIcon className="size-3.5 shrink-0" />
              {creative.eyebrow}
            </span>
            <p className={`${type === "inline" ? "max-w-[18rem] text-xl" : "max-w-[31rem] text-sm min-[425px]:text-base sm:text-lg"} font-semibold leading-tight text-white`}>
              {creative.title}
            </p>
          </div>
          <span className={`${type === "inline" ? "mt-5" : "shrink-0"} inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-bold text-[#0b3474] transition group-hover:bg-blue-50`}>
            <span className="hidden min-[375px]:inline">{creative.cta}</span>
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </NextLink>
    </aside>
  );
};
