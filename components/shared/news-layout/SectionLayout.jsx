/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Pagination,
  Chip,
} from "@heroui/react";
import SectionHeader from "@/components/news-sections/SectionHeader";
import Link from "next/link";
import { AdSlot } from "../advertisement/AdSlot";

// COLOR_MAP
const COLOR_MAP = {
  blue: {
    primary: "text-blue-600",
    hover: "text-blue-500",
    bg: "bg-blue-600",
    bgHover: "bg-blue-700",
  },
  red: {
    primary: "text-red-600",
    hover: "text-red-500",
    bg: "bg-red-600",
    bgHover: "bg-red-700",
  },
  green: {
    primary: "text-green-600",
    hover: "text-green-500",
    bg: "bg-green-600",
    bgHover: "bg-green-700",
  },
  amber: {
    primary: "text-amber-600",
    hover: "text-amber-500",
    bg: "bg-amber-600",
    bgHover: "bg-amber-700",
  },
  purple: {
    primary: "text-purple-600",
    hover: "text-purple-500",
    bg: "bg-purple-600",
    bgHover: "bg-purple-700",
  },
  yellow: {
    primary: "text-yellow-400",
    hover: "text-yellow-300",
    bg: "bg-yellow-400",
    bgHover: "bg-yellow-500",
  },
  cyan: {
    primary: "text-cyan-600",
    hover: "text-cyan-500",
    bg: "bg-cyan-600",
    bgHover: "bg-cyan-700",
  },
  pink: {
    primary: "text-pink-600",
    hover: "text-pink-500",
    bg: "bg-pink-600",
    bgHover: "bg-pink-700",
  },
  indigo: {
    primary: "text-indigo-600",
    hover: "text-indigo-500",
    bg: "bg-indigo-600",
    bgHover: "bg-indigo-700",
  },
  orange: {
    primary: "text-orange-600",
    hover: "text-orange-500",
    bg: "bg-orange-600",
    bgHover: "bg-orange-700",
  },
};

export default function SectionLayout({
  sectionColor = "blue",
  sectionTitle,
  sectionIcon,
  sectionLink,
  ctaLabel,
  demoData,
  articleData,
  limit = 12,
  totalCount = 0,
  currentPage = 1,
  sectionUrlParams = "top-news",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colors = COLOR_MAP[sectionColor] || COLOR_MAP.blue;

  // Fallback to demo if no real articles
  const data = articleData?.length ? articleData : demoData || [];

  const totalPages = Math.ceil((totalCount || data.length) / limit);

  useEffect(() => {
    if (!searchParams.get("page")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(currentPage));
      router.replace(`?${params.toString()}`, { scroll: false });
      scrollTo(0, 0);
    }
  }, [router, searchParams, currentPage]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
    scrollTo(0, 0);
  };
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    }
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="space-y-8 md:space-y-12 px-4 md:px-6 lg:px-10 py-6">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Leading Article */}
        {data[0] && (
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg hover:shadow-2xl h-fit transition-all duration-300 rounded-xl">
              <CardHeader>
                <Image
                  src={data[0].image}
                  alt={data[0].title}
                  width={1200}
                  height={600}
                  className="w-full aspect-video object-cover rounded-t-xl"
                />
              </CardHeader>
              <CardBody
                className={`
    p-6 
    bg-gradient-to-b 
    from-${sectionColor}-100 
    dark:from-${sectionColor}-500 
    space-y-3
  `}
              >
                <Chip classNames={{ base: `${colors.bg} text-white` }}>
                  {sectionTitle}
                </Chip>
                <h3 className="text-xl md:text-2xl font-bold leading-snug">
                  {data[0].title}
                </h3>
                <p className="text-xs text-gray-400">
                  {formatRelativeTime(data[0].date)}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {data[0].summary}
                </p>
              </CardBody>

              <CardFooter className="p-6">
                <Button
                  asChild
                  className={`${colors.bg} text-white hover:${colors.bgHover}`}
                >
                  <Link
                    href={`/article/${sectionUrlParams}/${data[0].slug || data[0].id}`}
                  >
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Ads */}
            <AdSlot type="inline" />
            <AdSlot type="leaderboard" />
          </div>
        )}

        {/* Sidebar */}
        <aside className="space-y-6">
          <h4 className={`text-lg font-semibold ${colors.primary}`}>
            Latest Updates
          </h4>
          {data.slice(1, 4).map((item) => (
            <Card
              key={item.id}
              className="flex items-center gap-3 shadow hover:shadow-md transition-all duration-300 rounded-lg p-3"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="w-full h-20 object-cover rounded-lg aspect-square"
              />
              <CardBody className="p-0 flex flex-col justify-center">
                <h5 className="text-sm font-medium  line-clamp-2">
                  {item.title}
                </h5>
                <p className="text-xs text-gray-400">
                  {formatRelativeTime(item.date)}
                </p>
                <Link
                  href={`/article/${sectionUrlParams}/${item.slug || item.id}`}
                  className={`text-xs ${colors.primary} font-semibold hover:underline mt-1`}
                >
                  Read →
                </Link>
              </CardBody>
            </Card>
          ))}
          <div className="sticky top-[100px] hidden lg:block">
            <AdSlot type="side" />
          </div>
        </aside>
      </div>

      {/* Section Header */}
      <SectionHeader
        title={sectionTitle}
        icon={sectionIcon}
        color={sectionColor}
        link={sectionLink}
        ctaLabel={ctaLabel}
        page
      />

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((article, idx) => (
          <div key={article.id} className="contents">
            <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col bg-white dark:bg-gray-900">
              <CardHeader>
                <Image
                  src={article.image}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full aspect-video object-cover rounded-t-xl"
                />
              </CardHeader>

              <CardBody className="p-4 space-y-2">
                <Chip classNames={{ base: `${colors.bg} text-white` }}>
                  {sectionTitle}
                </Chip>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {article.title}
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(article.date)}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {article.summary}
                </p>
              </CardBody>

              <CardFooter className="p-4">
                <Button
                  as="a"
                  href={`/article/${sectionUrlParams}/${article.slug || article.id}`}
                  className={`${colors.bg} text-white hover:${colors.bgHover} text-sm`}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>

            {(idx + 1) % 4 === 0 && <AdSlot type="inline" />}
          </div>
        ))}
      </div>

      <AdSlot type="leaderboard" />

      {/* Pagination */}
      <div className="flex justify-center items-center">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="lg"
          showControls
          radius="full"
          classNames={{
            cursor: `${colors.bg}`,
            next: `font-sm text-lg ${colors.primary}`,
          }}
          className={`${colors.primary} text-sm`}
        />
      </div>
    </section>
  );
}
