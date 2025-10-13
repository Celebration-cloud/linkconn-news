/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody, Image } from "@heroui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";

import SectionHeader from "./SectionHeader";
import GradientChip from "../shared/chip/GradientChip";
import IntroCard from "../shared/IntroCard/IntroCard"; // ✅ import reusable component

const fadeIn = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

export default function PoliticsSection({ articles = [] }) {
  const sectionColor = "yellow";

  const normalized = articles.map((a) => ({
    id: a.$id,
    title: a.title,
    slug: a.slug,
    summary: a.summary || "Stay tuned for more political updates.",
    image:
      a.cover ||
      "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
  }));

  const safeArticles =
    normalized.length >= 6
      ? normalized
      : [
          ...normalized,
          ...Array.from({ length: 6 - normalized.length }).map((_, i) => ({
            id: `placeholder-${i}`,
            slug: `placeholder-${i}`,
            title: "Coming Soon",
            summary: "Stay tuned for more political updates.",
            image: "https://source.unsplash.com/600x400/?politics",
            date: new Date().toLocaleDateString(),
          })),
        ];

  const [mainArticle, second, third, ...rest] = safeArticles;

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-10">
      <SectionHeader
        title="Politics"
        icon="pi-briefcase"
        color={sectionColor}
        link="/politics"
        ctaLabel="More politics"
      />

      {/* Reusable Intro Card */}
      <IntroCard
        label="Politics"
        sectionColor={sectionColor}
        title="Stay informed with the latest updates in politics"
        description="From elections to policy debates, we bring you the stories shaping the future."
        fadeIn={fadeIn}
        gradientFrom="from-yellow-100"
        gradientTo="to-yellow-200"
        borderColor="border-yellow-300 dark:border-zinc-600"
        textColor="black"
      />

      {/* Main Headline */}
      <motion.div {...fadeIn}>
        <Card
          as={NextLink}
          href={`/article/politics/${mainArticle.slug}`}
          key={mainArticle.id}
          className="relative shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group"
        >
          <div className="overflow-hidden">
            <Image
              src={mainArticle.image}
              alt={mainArticle.title}
              removeWrapper
              className="w-full h-64 z-0 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 sm:p-6">
            <GradientChip
              label="Politics"
              color={sectionColor}
              textColor="black"
            />
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mt-2 leading-snug line-clamp-3">
              {mainArticle.title}
            </h2>
            <p className="text-xs text-yellow-400 mt-1">{mainArticle.date}</p>
            <p className="text-sm text-gray-300 mt-2 line-clamp-3 hidden sm:block">
              {mainArticle.summary}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Two Medium Stories */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[second, third].map((article) => (
          <motion.div {...fadeIn} key={article.id}>
            <Card
              as={NextLink}
              href={`/article/politics/${article.slug}`}
              className="shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group"
            >
              <div className="overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  removeWrapper
                  className="h-48 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardBody className="p-4">
                <GradientChip
                  label="Politics"
                  color={sectionColor}
                  textColor="black"
                />
                <h3 className="font-semibold text-base sm:text-lg mt-2 text-foreground dark:text-white leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-yellow-500 mt-1">{article.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-2 hidden sm:block">
                  {article.summary}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grid of Smaller Articles */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rest.map((item) => (
          <motion.div {...fadeIn} key={item.id}>
            <Card
              as={NextLink}
              href={`/article/politics/${item.slug}`}
              className="flex flex-col shadow hover:shadow-lg transition-all duration-300 rounded-md overflow-hidden group"
            >
              <div className="overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  removeWrapper
                  className="h-32 sm:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardBody className="p-3">
                <GradientChip
                  label="Politics"
                  color={sectionColor}
                  textColor="black"
                />
                <h4 className="text-sm sm:text-base font-semibold text-foreground dark:text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-yellow-500 mt-1">{item.date}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
