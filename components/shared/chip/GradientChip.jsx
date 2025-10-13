/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// components/GradientChip.jsx
"use client";

import { Chip } from "@heroui/react";

const COLOR_MAP = {
  blue: { from: "from-blue-400", to: "to-blue-600" },
  red: { from: "from-red-400", to: "to-red-600" },
  green: { from: "from-green-400", to: "to-green-600" },
  amber: { from: "from-amber-400", to: "to-amber-600" },
  purple: { from: "from-purple-400", to: "to-purple-600" },
  yellow: { from: "from-yellow-300", to: "to-yellow-500" },
  cyan: { from: "from-cyan-400", to: "to-cyan-600" },
  pink: { from: "from-pink-400", to: "to-pink-600" },
  indigo: { from: "from-indigo-400", to: "to-indigo-600" },
  orange: { from: "from-orange-400", to: "to-orange-600" },
};

export default function GradientChip({ label, color = "blue", size = "sm", textColor="white" }) {
  const gradient = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <Chip
      size={size}
      variant="flat"
      classNames={{
        base: `bg-gradient-to-r ${gradient.from} ${gradient.to} text-${textColor} font-medium`,
        content: `dark:text-${textColor} uppercase tracking-wide`
      }}
    >
      {label}
    </Chip>
  );
}
