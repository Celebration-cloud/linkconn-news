/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { siteConfig } from "@/config/site";
import { Card, CardBody, Image, Chip, Button } from "@heroui/react";
import NextLink from "next/link";

export default function HeroNewsSection({ featured, trending }) {
  // Fallbacks if data is missing
  const mainFeature = featured || {
    id: "placeholder",
    title: "No Breaking News",
    summary: "No articles available at the moment.",
    cover: "/default-news.jpg",
    category: "Breaking News",
  };

  const trendingList = trending?.length
    ? trending
    : [
        {
          id: "fallback-1",
          title: "No trending news available",
          date: "Today",
          cover: siteConfig.logo,
        },
        {
          id: "fallback-2",
          title: "Check back later for updates",
          date: "Today",
          cover: siteConfig.logo,
        },
        {
          id: "fallback-3",
          title: "Stay tuned for latest news",
          date: "Today",
          cover: siteConfig.logo,
        },
      ];

  return (
    <section className="grid md:grid-cols-3 gap-6 my-10">
      {/* Featured Story */}
      <Card className="relative md:col-span-2 shadow-xl rounded-2xl overflow-hidden group">
        <Image
          src={mainFeature.cover}
          alt={mainFeature.title}
          removeWrapper
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-500 z-0"
        />

        {/* Gradient overlay + backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-20 flex items-end backdrop-blur-sm">
          <div className="p-6 md:p-12 text-white max-w-full md:max-w-2xl">
            <Chip
              color="danger"
              className="mb-3 uppercase tracking-wide text-xs md:text-sm"
            >
              {mainFeature.category}
            </Chip>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-snug md:leading-tight">
              {mainFeature.title}
            </h1>
            <p className="mt-2 md:mt-3 text-sm md:text-lg text-gray-200 line-clamp-3">
              {mainFeature.summary}
            </p>
            <Button
              as={NextLink}
              href={`/article/breaking-news/${mainFeature.id}`}
              size="md"
              className="mt-4 md:mt-6 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Read More
            </Button>
          </div>
        </div>
      </Card>

      {/* Sidebar Trending Stories */}
      <aside className="space-y-4 md:space-y-5">
        {trendingList.slice(0, 3).map((item) => (
          <Card
            key={item.id}
            isPressable
            as={NextLink}
            href={`/article/${item.id}`}
            className="relative flex flex-col md:flex-row shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02] h-40 md:h-36"
          >
            {/* Image on top for mobile, left for desktop */}
            <div className="w-full md:w-32 h-24 md:h-full overflow-hidden flex-shrink-0">
              <Image
                src={item.cover}
                alt={item.title}
                removeWrapper
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text with gradient background */}
            <CardBody className="flex flex-col justify-between p-3 md:p-4 w-full bg-gradient-to-r from-black/60 via-black/40 to-black/20 text-white">
              <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-200">{item.date}</p>
            </CardBody>
          </Card>
        ))}
      </aside>
    </section>
  );
}
