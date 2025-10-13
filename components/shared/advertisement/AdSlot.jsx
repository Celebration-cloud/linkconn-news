/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";
import { Card } from "@heroui/react";


const adPresets = {
  hero: {
    width: "w-full md:w-[728px]",
    height: "h-[90px]",
    label: "Advertisement — 728x90",
  },
  inline: {
    width: "w-full md:w-[300px]",
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

export const AdSlot = ({
  type = "hero",
  width,
  height,
  label,
  className = "",
  children,
}) => {
  const preset = adPresets[type];

  const adWidth = width || preset?.width || "w-full md:w-[300px]";
  const adHeight = height || preset?.height || "h-[250px]";
  const adLabel = label || preset?.label || "Advertisement";

  return (
    <section className={`flex justify-center my-10 ${className}`}>
      <Card
        className={`${adWidth} ${adHeight} bg-foreground-50 border border-gray-300 flex items-center justify-center`}
      >
        {children ? (
          children
        ) : (
          <span className="text-gray-600 text-sm text-center px-2">
            {adLabel}
          </span>
        )}
      </Card>
    </section>
  );
};
