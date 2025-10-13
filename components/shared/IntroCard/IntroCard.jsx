/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import GradientChip from "../chip/GradientChip";

export default function IntroCard({
  label,
  sectionColor,
  title,
  description,
  fadeIn =  {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true },
  },
  gradientFrom,
  gradientTo,
  borderColor,
  textColor = "black",
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card
        className={`rounded-xl shadow-md bg-gradient-to-r ${gradientFrom} ${gradientTo} dark:from-zinc-800 dark:to-zinc-700 border ${borderColor}`}
      >
        <CardBody className="p-6 text-center">
          <GradientChip
            label={label}
            color={sectionColor}
            textColor={textColor}
          />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-3 dark:text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2">
            {description}
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
}
