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

export default function EntertainmentSection({ articles = [] }) {
  const sectionColor = "purple";

  // Normalize
  const normalized = articles.map((a) => ({
    id: a.$id,
    slug: a.slug || a.$id,
    title: a.title,
    summary: a.summary,
    image: a.cover,
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
  }));

  // Ensure at least 4
  const safeArticles =
    normalized.length >= 4
      ? normalized
      : [
          ...normalized,
          ...Array.from({ length: 4 - normalized.length }).map((_, i) => ({
            id: `placeholder-${i}`,
            slug: `placeholder-${i}`,
            title: "Coming Soon",
            summary: "Stay tuned for more entertainment stories.",
            image:
              "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
            date: new Date().toLocaleDateString(),
          })),
        ];

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <SectionHeader
        title="Entertainment"
        icon="pi-video"
        color={sectionColor}
        link="/entertainment"
        ctaLabel="More entertainment"
      />

      {/* Featured */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="p-0">
            <motion.div
              className="w-full h-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={safeArticles[0].image}
                alt={safeArticles[0].title}
                removeWrapper
                className="w-full h-64 sm:h-72 md:h-96 object-cover"
              />
            </motion.div>
          </CardHeader>
          <CardBody
            className={`p-6 space-y-4 bg-gradient-to-b from-${sectionColor}-50 to-white dark:from-zinc-900 dark:to-zinc-800`}
          >
            <GradientChip
              label="Entertainment"
              color={sectionColor}
              size="lg"
            />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 dark:text-white">
              {safeArticles[0].title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              {safeArticles[0].date}
            </p>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {safeArticles[0].summary}
            </p>
          </CardBody>
          <CardFooter className="p-6">
            <Button
              as={NextLink}
              href={`/article/entertainment/${safeArticles[0].slug}`}
              className={`bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700`}
            >
              Read More
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeArticles.slice(1).map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col">
              <motion.div
                className="w-full h-40 sm:h-48 md:h-52 overflow-hidden rounded-t-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  removeWrapper
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <CardBody className="p-4 flex-1 flex flex-col justify-between">
                <GradientChip
                  label="Entertainment"
                  color={sectionColor}
                  size="sm"
                />
                <h4 className="font-semibold text-lg mb-1 dark:text-white line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {article.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                  {article.summary}
                </p>
              </CardBody>
              <CardFooter className="p-4">
                <Button
                  as={NextLink}
                  href={`/article/entertainment/${article.slug}`}
                  size="sm"
                  className={`bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700 w-full`}
                >
                  Read
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
