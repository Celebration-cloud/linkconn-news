/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import GradientChip from "../shared/chip/GradientChip";
import IntroCard from "../shared/IntroCard/IntroCard";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true },
};

export default function TechnologySection({ articles = [] }) {
  const sectionColor = "red";

  const buttonClasses =
    "bg-gradient-to-r from-red-500 via-rose-600 to-pink-700 text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 hover:shadow-red-500/50 transition-all";

  const normalized = articles.map((a) => ({
    id: a.$id,
    title: a.title,
    summary: a.summary || "Stay tuned for futuristic technology updates.",
    image: a.cover,
    slug: a.slug,
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
  }));

  const safeArticles =
    normalized.length >= 8
      ? normalized
      : [
          ...normalized,
          ...Array.from({ length: 8 - normalized.length }).map((_, i) => ({
            id: `placeholder-${i}`,
            slug: `placeholder-${i}`,
            title: "Coming Soon",
            summary: "More futuristic updates are on the way.",
            image:
              "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
            date: new Date().toLocaleDateString(),
          })),
        ];

  const [index, setIndex] = useState(0);
  const hero = safeArticles[index];
  const rest = safeArticles.filter((_, i) => i !== index);

  // Auto rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [safeArticles.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-12">
      <SectionHeader
        title="Technology"
        icon="pi-desktop"
        color={sectionColor}
        link="/technology"
        ctaLabel="Explore Tech"
      />

      {/* Reusable Intro Card */}
      <IntroCard
        label="Technology"
        sectionColor={sectionColor}
        title="Explore innovations shaping the future"
        description="From AI breakthroughs to next-gen gadgets, we bring you updates on how technology is transforming the world."
        fadeIn={fadeIn}
        gradientFrom="from-red-100"
        gradientTo="to-pink-100"
        borderColor="border-red-300 dark:border-zinc-600"
        textColor="black"
      />

      {/* Hero with animated transitions */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="relative overflow-hidden rounded-2xl shadow-2xl border border-red-500/30">
              <Image
                src={hero.image}
                alt={hero.title}
                removeWrapper
                className="w-full h-[420px] md:h-[520px] object-cover z-0 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent dark:from-zinc-900/95 dark:via-zinc-900/70 dark:to-transparent backdrop-blur-sm flex flex-col justify-end p-8">
                <GradientChip
                  label="Technology"
                  color={sectionColor}
                  size="md"
                />
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg">
                  {hero.title}
                </h2>
                <p className="text-sm text-gray-300 mb-4">{hero.date}</p>
                <p className="text-gray-200 dark:text-gray-300 max-w-2xl leading-relaxed line-clamp-3">
                  {hero.summary}
                </p>
                <Button
                  as={NextLink}
                  href={`/article/technology/${hero.slug || hero.id}`}
                  className={`mt-6 w-fit ${buttonClasses}`}
                >
                  Read More →
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal scroll */}
      <motion.div
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ height: "fit-content" }}
        drag="x"
        dragConstraints={{ left: -600, right: 0 }}
      >
        {rest.map((article) => (
          <motion.div key={article.id} {...fadeIn}>
            <Card
              as={NextLink}
              href={`/article/technology/${article.slug || article.id}`}
              isPressable
              className="min-w-[260px] max-w-[280px] flex-shrink-0 rounded-xl 
                bg-white dark:bg-zinc-900 border border-red-500/40 
                hover:border-pink-500/50 shadow-lg dark:shadow-red-500/20 
                hover:shadow-red-500/40 transition-all"
            >
              <Image
                src={article.image}
                alt={article.title}
                removeWrapper
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <CardBody className="p-4 flex flex-col justify-between">
                <GradientChip
                  label="Technology"
                  color={sectionColor}
                  size="sm"
                />
                <h4 className="text-sm font-semibold line-clamp-2 text-foreground dark:text-white hover:text-red-500 transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {article.date}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
