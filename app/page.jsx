/* eslint-disable react/react-in-jsx-scope */
import { Suspense } from "react";
import { getMainPageArticles } from "@/lib/actions/getMainPageArticles";
import HeroNewsSection from "@/components/news-sections/HeroNewsSection";
import TopNewsSection from "@/components/news-sections/TopNewsSection";
import WorldNewsSection from "@/components/news-sections/WorldNewsSection";
import TechnologySection from "@/components/news-sections/TechnologySection";
import BusinessSection from "@/components/news-sections/BusinessSection";
import PoliticsSection from "@/components/news-sections/PoliticsSection";
import SportsSection from "@/components/news-sections/SportsSection";
import EntertainmentSection from "@/components/news-sections/EntertainmentSection";

export const revalidate = 180; // Revalidate every 3 minutes for fresh world feeds

export default async function HomePage() {
  const {
    breakingNews,
    topNews,
    sports,
    politics,
    technology,
    business,
    entertainment,
    worldNews,
  } = await getMainPageArticles();

  return (
    <div className="site-container space-y-12 pb-16 min-[720px]:space-y-16">
      {/* Hero Dispatch & Trending Wire */}
      <HeroNewsSection
        featured={breakingNews?.[0]}
        trending={breakingNews?.slice(1, 4)}
      />

      {/* Thin Editorial Divider */}
      <div className="h-px w-full bg-neutral-200/80 dark:border-neutral-800/80" />

      {/* Top Stories */}
      <Suspense fallback={<SectionSkeleton />}>
        <TopNewsSection articles={topNews} />
      </Suspense>

      {/* World News Dispatch */}
      <Suspense fallback={<SectionSkeleton />}>
        <WorldNewsSection articles={worldNews} />
      </Suspense>

      {/* Technology & Frontier */}
      <Suspense fallback={<SectionSkeleton />}>
        <TechnologySection articles={technology} />
      </Suspense>

      {/* Business & Global Markets */}
      <Suspense fallback={<SectionSkeleton />}>
        <BusinessSection articles={business} />
      </Suspense>

      {/* Politics & Policy */}
      <Suspense fallback={<SectionSkeleton />}>
        <PoliticsSection articles={politics} />
      </Suspense>

      {/* Sports Arena */}
      <Suspense fallback={<SectionSkeleton />}>
        <SportsSection articles={sports} />
      </Suspense>

      {/* Culture & Entertainment */}
      <Suspense fallback={<SectionSkeleton />}>
        <EntertainmentSection articles={entertainment} />
      </Suspense>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      <div className="tablet-news-grid grid grid-cols-1 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-800/60 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
