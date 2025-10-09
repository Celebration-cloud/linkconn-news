/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import GradientChip from "../chip/GradientChip";

export default function WorldNewsSection({ articles = [] }) {
  const sectionColor = "green";

  // Normalize Appwrite data
  const normalized = articles.map((a) => ({
    id: a.$id,
    slug: a.slug || a.$id,
    title: a.title,
    summary: a.summary,
    image: a.cover,
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
  }));

  // Ensure at least 6 items
  const safeArticles =
    normalized.length >= 6
      ? normalized
      : [
          ...normalized,
          ...Array.from({ length: 6 - normalized.length }).map((_, i) => ({
            id: `placeholder-${i}`,
            slug: `placeholder-${i}`,
            title: "Coming Soon",
            summary: "Stay tuned for more world news updates.",
            image:
              "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
            date: new Date().toLocaleDateString(),
          })),
        ];

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-8">
      {/* Section Header */}
      <SectionHeader
        title="World News"
        icon="pi-globe"
        color={sectionColor}
        link="/world-news"
        ctaLabel="More world news"
      />

      {/* Featured Articles - Two Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeArticles.slice(0, 2).map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader className="p-0">
                <motion.div
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    removeWrapper
                    className="w-full h-64 sm:h-72 md:h-80 object-cover"
                  />
                </motion.div>
              </CardHeader>
              <CardBody
                className={`p-6 bg-gradient-to-b from-${sectionColor}-50 to-white dark:from-zinc-900 dark:to-zinc-800`}
              >
                <GradientChip label="World" color={sectionColor} size="md" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {article.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base line-clamp-3">
                  {article.summary}
                </p>
              </CardBody>
              <CardFooter className="p-6">
                <Button
                  as={NextLink}
                  href={`/article/world/${article.slug}`}
                  className={`bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700`}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Secondary Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {safeArticles.slice(2).map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
          >
            <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full sm:w-40 md:w-48 h-40 sm:h-auto object-cover overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  removeWrapper
                  className="w-full h-full object-cover "
                />
              </motion.div>
              <CardBody className="p-4 flex flex-col justify-between flex-1">
                <GradientChip label="World" color={sectionColor} size="sm" />
                <h4 className="font-semibold text-base sm:text-lg mb-1 text-gray-900 dark:text-gray-100 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {article.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                  {article.summary}
                </p>
                <CardFooter className="mt-2 p-0">
                  <Button
                    as={NextLink}
                    href={`/article/world/${article.slug}`}
                    size="sm"
                    className={`bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700 w-full sm:w-auto`}
                  >
                    Read
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
