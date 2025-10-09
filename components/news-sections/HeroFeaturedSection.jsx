/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody, Image, Chip, Button } from "@heroui/react";
import NextLink from "next/link";

export default function HeroFeaturedSection({ featured, trending }) {
  return (
    <section className="grid md:grid-cols-3 gap-8 my-10">
      {/* Featured Story */}
      <Card className="relative md:col-span-2 shadow-xl rounded-2xl overflow-hidden group">
        <Image
          src={featured.image}
          alt={featured.title}
          removeWrapper
          className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent flex items-end">
          <div className="p-8 md:p-12 text-white max-w-2xl">
            <Chip color="danger" className="mb-4 uppercase tracking-wide">
              {featured.category}
            </Chip>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              {featured.title}
            </h1>
            <p className="mt-3 text-lg text-gray-200 line-clamp-3">
              {featured.summary}
            </p>
            <Button
              as={NextLink}
              href={`/article/${featured.id}`}
              size="lg"
              className="mt-6 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Read More
            </Button>
          </div>
        </div>
      </Card>

      {/* Sidebar Trending Stories */}
      <aside className="space-y-5">
        {trending.slice(0, 3).map((item) => (
          <Card
            key={item.id}
            isPressable
            as={NextLink}
            href={`/article/${item.id}`}
            className="relative flex items-center shadow-md hover:shadow-lg rounded-xl overflow-hidden h-36 transition-transform hover:scale-[1.02]"
          >
            <Image
              src={item.image}
              alt={item.title}
              className="w-32 h-full object-cover"
            />
            <CardBody className="p-4 flex flex-col justify-between">
              <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">{item.date}</p>
            </CardBody>
          </Card>
        ))}
      </aside>
    </section>
  );
}
