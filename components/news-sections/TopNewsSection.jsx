/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import NextLink from "next/link";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import GradientChip from "../chip/GradientChip";

export default function TopNewsSection({ articles = [] }) {
  const sectionColor = "blue";

  const normalized = articles.map((a) => ({
    id: a.$id,
    slug: a.slug || a.$id,
    title: a.title,
    summary: a.summary,
    image: a.cover,
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
    ...a,
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
            summary: "Stay tuned for more updates.",
            image:
              "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
            date: new Date().toLocaleDateString(),
          })),
        ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-8">
      <SectionHeader
        title="Top News"
        icon="pi-star"
        color={sectionColor}
        link="/top-news"
        ctaLabel="See all top news"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leading Article */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
          >
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader className="p-0 overflow-hidden">
                <Image
                  src={safeArticles[0].image}
                  alt={safeArticles[0].title}
                  removeWrapper
                  className="w-full h-60 sm:h-72 md:h-96 object-cover"
                />
              </CardHeader>

              <CardBody className="p-6 bg-white dark:bg-neutral-900">
                <GradientChip label="Top" color={sectionColor} size="lg" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-foreground dark:text-white">
                  {safeArticles[0].title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {safeArticles[0].date}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {safeArticles[0].summary}
                </p>
              </CardBody>

              <CardFooter className="p-6">
                <Button
                  as={NextLink}
                  href={`/article/top-news/${safeArticles[0].slug}`}
                  className={`bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700`}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Two Smaller Featured */}
          <div className="grid sm:grid-cols-2 gap-6">
            {safeArticles.slice(1, 3).map((article, idx) => (
              <motion.div
                key={article.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ y: -4 }}
              >
                <Card className="shadow hover:shadow-md transition-all duration-300 rounded-xl flex flex-col overflow-hidden">
                  <CardHeader className="p-0 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      removeWrapper
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  </CardHeader>
                  <CardBody className="p-4">
                    <GradientChip label="Top" color={sectionColor} size="md" />
                    <h4 className="text-base sm:text-lg font-semibold mb-1 text-foreground dark:text-white">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {article.date}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {article.summary}
                    </p>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Button
                      as={NextLink}
                      href={`/article/top-news/${article.slug}`}
                      className={`bg-${sectionColor}-600 text-white hover:bg-${sectionColor}-700 text-sm`}
                    >
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supporting Articles */}
        <div className="flex flex-col gap-6">
          {safeArticles.slice(3).map((article, idx) => (
            <motion.div
              key={article.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col sm:flex-row overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  removeWrapper
                  className="w-full h-48 object-cover sm:w-36 md:w-40 lg:w-48 sm:h-auto"
                />

                <CardBody className="p-4 flex flex-col justify-between flex-1">
                  <GradientChip label="Top" color={sectionColor} size="sm" />

                  <h4 className="font-semibold text-lg sm:text-base md:text-lg lg:text-xl leading-snug mb-1 line-clamp-2 text-foreground dark:text-white">
                    {article.title}
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {article.date}
                  </p>

                  <p className="text-sm sm:text-xs md:text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {article.summary}
                  </p>

                  <CardFooter className="mt-3 p-0">
                    <Button
                      as={NextLink}
                      href={`/article/top-news/${article.slug}`}
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
      </div>
    </section>
  );
}
