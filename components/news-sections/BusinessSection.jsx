/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import NextLink from "next/link";
import GradientChip from "../shared/chip/GradientChip";
import { motion } from "framer-motion";
import IntroCard from "../shared/IntroCard/IntroCard";

export default function BusinessSection({ articles = [] }) {
  const sectionColor = "cyan";

  // Normalize incoming Appwrite articles
  const normalized = articles.map((a) => ({
    id: a.$id,
    slug: a.slug || a.$id,
    title: a.title,
    summary: a.summary || "Stay tuned for more updates.",
    image:
      a.cover ||
      "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
    date: new Date(a.$updatedAt || a.$createdAt).toLocaleDateString(),
  }));

  // Ensure minimum of 7 articles for layout
  const safeArticles =
    normalized.length >= 7
      ? normalized
      : [
          ...normalized,
          ...Array.from({ length: 7 - normalized.length }).map((_, i) => ({
            id: `placeholder-${i}`,
            slug: `placeholder-${i}`,
            title: "Coming Soon",
            summary: "Stay tuned for more updates.",
            image:
              "https://fra.cloud.appwrite.io/v1/storage/buckets/6880345f000409910241/files/6898a18400297a7b024d/view?project=687746aa001066dbe64c&mode=admin",
            date: new Date().toLocaleDateString(),
          })),
        ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-10">
      {/* Section Header */}
      <SectionHeader
        title="Business"
        icon="pi-briefcase"
        color={sectionColor}
        link="/business"
        ctaLabel="More Business News"
      />

      {/* Reusable Intro Card for Business */}
      <IntroCard
        label="Business"
        sectionColor={sectionColor}
        title="Stay ahead with the latest updates in business"
        description="From market trends to financial insights, we bring you the stories driving global commerce."
        gradientFrom="from-cyan-100"
        gradientTo="to-cyan-200"
        borderColor="border-cyan-300 dark:border-zinc-600"
        textColor="black"
      />

      {/* Business Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Leading Article */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-2"
        >
          <Card
            as={NextLink}
            href={`/article/business/${safeArticles[0].slug}`}
            className="shadow-lg hover:shadow-2xl transition-all duration-300 h-fit rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
          >
            <CardHeader className="p-0">
              <Image
                src={safeArticles[0].image}
                alt={safeArticles[0].title}
                width={800}
                height={600}
                className="w-full h-72 md:h-96 object-cover rounded-t-xl"
              />
            </CardHeader>
            <CardBody className="p-6">
              <GradientChip label="Business" color={sectionColor} size="lg" />
              <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-2 text-zinc-900 dark:text-zinc-100">
                {safeArticles[0].title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                {safeArticles[0].date}
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {safeArticles[0].summary}
              </p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Secondary Articles */}
        <div className="flex flex-col gap-6">
          {safeArticles.slice(1, 3).map((article, i) => (
            <motion.div
              key={article.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <Card
                as={NextLink}
                href={`/article/business/${article.slug}`}
                className="shadow-md hover:shadow-xl transition-all duration-300 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
              >
                <CardHeader className="p-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <GradientChip
                    label="Business"
                    color={sectionColor}
                    size="sm"
                  />
                  <h4 className="text-lg font-semibold mb-1 text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                    {article.date}
                  </p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">
                    {article.summary}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar - Quick Business Updates */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {safeArticles.slice(3, 7).map((article, i) => (
          <motion.div
            key={article.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Card
              as={NextLink}
              href={`/article/business/${article.slug}`}
              className="shadow hover:shadow-md rounded-lg transition-all duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={400}
                height={300}
                className="w-full h-28 object-cover rounded-t-lg"
              />
              <CardBody className="p-3">
                <GradientChip label="Business" color={sectionColor} size="sm" />
                <h5 className="text-sm font-semibold line-clamp-2 mb-1 text-zinc-900 dark:text-zinc-100">
                  {article.title}
                </h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {article.date}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
