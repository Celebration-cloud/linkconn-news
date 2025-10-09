/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Button } from "@heroui/react";
import { Image } from "@heroui/react";
import NextLink from "next/link";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import GradientChip from "../chip/GradientChip";

export default function SportsSection({ articles = [] }) {
  const sectionColor = "amber"; // Sports = amber

  // Pre-build reusable classes
  const buttonClasses = `bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700`;
  const headingClasses = `text-lg font-semibold text-${sectionColor}-600 dark:text-${sectionColor}-400`;

  // Normalize Appwrite docs
  const normalized = articles.map((a) => ({
    id: a.$id,
    title: a.title,
    summary: a.summary || "Stay tuned for more sports updates.",
    image:
      a.cover ||
      "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
    slug: a.slug,
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
  }));

  // Ensure minimum articles
  const safeArticles =
    normalized.length >= 9
      ? normalized
      : [
          ...normalized,
          ...Array.from({ length: 9 - normalized.length }).map((_, i) => ({
            id: `placeholder-${i}`,
            slug: `placeholder-${i}`,
            title: "Coming Soon",
            summary: "Stay tuned for more sports updates.",
            image:
              "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
            date: new Date().toLocaleDateString(),
          })),
        ];

  const [hero, ...rest] = safeArticles;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-10">
      {/* Section Header */}
      <SectionHeader
        title="Sports"
        icon="pi-star"
        color={sectionColor}
        link="/sports"
        ctaLabel="More sports"
      />

      {/* Hero Article */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="relative overflow-hidden rounded-2xl shadow-lg group">
          <div className="overflow-hidden">
            <Image
              src={hero.image}
              alt={hero.title}
              removeWrapper
              className="w-full h-80 md:h-[480px] object-cover z-0 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
            <GradientChip label="Sports" color={sectionColor} size="lg" />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {hero.title}
            </h2>
            <p className="text-sm text-gray-200 mb-3">{hero.date}</p>
            <p className="text-gray-300 max-w-2xl">{hero.summary}</p>
            <Button
              as={NextLink}
              href={`/article/sports/${hero.slug || hero.id}`}
              className={`mt-4 w-fit ${buttonClasses}`}
            >
              Read More
            </Button>
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Highlight grid */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          {rest.slice(0, 4).map((article, idx) => (
            <motion.div
              key={article.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card className="shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden group">
                <CardHeader className="p-0 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    removeWrapper
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <GradientChip label="Sports" color={sectionColor} />
                  <h4 className="text-lg font-semibold line-clamp-2 text-foreground dark:text-white">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {article.date}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {article.summary}
                  </p>
                </CardBody>
                <CardFooter className="px-4 pb-4">
                  <Button
                    as={NextLink}
                    href={`/article/sports/${article.slug || article.id}`}
                    size="sm"
                    className={buttonClasses}
                  >
                    Read
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar latest */}
        <aside className="space-y-4">
          <h3
            className={`text-lg font-bold border-b border-gray-300 dark:border-gray-700 ${headingClasses} pb-2`}
          >
            Latest Updates
          </h3>
          {rest.slice(4, 9).map((article, idx) => (
            <motion.div
              key={article.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card
                as={NextLink}
                href={`/article/sports/${article.slug || article.id}`}
                isPressable
                className="flex gap-3 shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    removeWrapper
                    className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardBody className="p-3 flex flex-col justify-between">
                  <GradientChip label="Sports" color={sectionColor} />
                  <h4 className="text-sm font-semibold line-clamp-2 text-foreground dark:text-white">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {article.date}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </aside>
      </div>
    </section>
  );
}
