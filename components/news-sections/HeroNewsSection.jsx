/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import NextLink from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { normalizeCategory } from "@/lib/category-themes";

export default function HeroNewsSection({ featured, trending }) {
  const main = featured || {
    id: "lead-1",
    title: "Global Leaders Convene in Geneva for Historic AI & Cyber Governance Summit",
    summary:
      "Diplomats and leading researchers sign an unprecedented multilateral accord establishing transparency and safety frameworks for frontier generative models.",
    cover: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop",
    section: "World",
    slug: "global-leaders-convene-geneva-historic-ai-cyber-governance-summit",
    readingTime: "4 min read",
    authorName: "Elena Rostova",
    publishedAt: new Date().toISOString(),
  };

  const trendingList = trending?.length ? trending : [];

  const mainSection = main.newsSection || main.section || "world";
  const mainSlug = main.slug || main.id;
  const mainCategory = normalizeCategory(mainSection);

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lead Featured Story (8 cols) */}
        <div data-category={mainCategory} className="group lg:col-span-8">
          <NextLink
            href={`/article/${mainSection.toLowerCase()}/${mainSlug}`}
            className="block relative rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 shadow-lg editorial-card"
          >
            {/* Image Container with aspect ratio */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src={featureCover(main.cover)}
                alt={main.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Refined gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top status tag */}
              <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2 min-[375px]:left-4 min-[375px]:top-4">
                <span className="flex items-center gap-1.5 rounded-lg bg-red-700/95 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Lead Story
                </span>
                <span className="category-fill rounded-lg px-2.5 py-1 text-xs font-medium uppercase tracking-wider shadow-sm">
                  {mainSection}
                </span>
              </div>

              {/* Bottom content overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white min-[375px]:p-5 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-neutral-300 mb-2 font-medium">
                  <span>{main.authorName || "Editorial Staff"}</span>
                  <span>•</span>
                  <span>{main.readingTime || "4 min read"}</span>
                </div>

                <h1 className="mb-2 font-serif text-[clamp(1.45rem,7vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-white transition-colors group-hover:text-blue-100 sm:mb-3">
                  {main.title}
                </h1>

                <p className="mb-3 hidden max-w-3xl text-base leading-relaxed text-blue-50/85 min-[425px]:line-clamp-2 min-[425px]:block sm:mb-4 sm:line-clamp-3">
                  {main.summary}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all group-hover:gap-3">
                  <span>Read Full Dispatch</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </NextLink>
        </div>

        {/* Trending Wire Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
            <div className="flex items-center gap-2">
              <Radio className="size-4 text-red-600 dark:text-red-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Trending Wire
              </h2>
            </div>
            <span className="text-xs font-medium text-neutral-400">
              Verified Feeds
            </span>
          </div>

          <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {trendingList.slice(0, 3).map((item, idx) => {
              const sec = item.newsSection || item.section || "world";
              const slug = item.slug || item.id;
              const rank = String(idx + 1).padStart(2, "0");
              const itemCategory = normalizeCategory(sec);

              return (
                <NextLink
                  data-category={itemCategory}
                  key={item.id || idx}
                  href={`/article/${sec.toLowerCase()}/${slug}`}
                  className="py-4 first:pt-0 last:pb-0 group flex items-start gap-4 transition-colors"
                >
                  <span className="font-serif font-black text-2xl text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                    {rank}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="category-tint rounded px-2 py-1 text-xs font-bold uppercase tracking-wider">
                        {sec}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {item.readingTime || "3 min"}
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--category-accent)]">
                      {item.title}
                    </h3>
                  </div>
                </NextLink>
              );
            })}
          </div>

          {/* Quick Newsletter Micro-Card */}
          <div className="mt-6 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-1">
              Morning World Briefing
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
              Essential global headlines curated daily before markets open.
            </p>
            <div className="flex items-center text-xs font-semibold text-neutral-900 dark:text-white group cursor-pointer">
              <span>Subscribe free</span>
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function featureCover(cover) {
  if (cover && cover.startsWith("http")) return cover;
  return "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop";
}
