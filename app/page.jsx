/* eslint-disable react/react-in-jsx-scope */
import { lazy, Suspense } from "react";
import { AdSlot } from "@/components/advertisement/AdSlot";
import { getMainPageArticles } from "@/lib/actions/getMainPageArticles";

// Lazy-load all sections except Hero
const TopNewsSection = lazy(
  () => import("@/components/news-sections/TopNewsSection")
);
const SportsSection = lazy(
  () => import("@/components/news-sections/SportsSection")
);
const PoliticsSection = lazy(
  () => import("@/components/news-sections/PoliticsSection")
);
const TechnologySection = lazy(
  () => import("@/components/news-sections/TechnologySection")
);
const EntertainmentSection = lazy(
  () => import("@/components/news-sections/EntertainmentSection")
);
const WorldNewsSection = lazy(
  () => import("@/components/news-sections/WorldNewsSection")
);
const BusinessSection = lazy(
  () => import("@/components/news-sections/BusinessSection")
);
const HeroFeaturedSection = lazy(
  () => import("@/components/news-sections/HeroFeaturedSection")
);

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

  console.log("Breaking News: ", breakingNews);
  console.log("Top News: ", topNews);
  console.log("Sports: ", sports);
  console.log("Politics: ", politics);
  console.log("Technology: ", technology);
  console.log("Business: ", business);
  console.log("Entertainment: ", entertainment);
  console.log("World News: ", worldNews);
  const featuredStory = {
    id: "featured",
    title: "Global Markets Shake as Oil Prices Surge Overnight",
    summary:
      "Investors react to sudden oil supply cuts as prices hit new highs, sparking concerns about inflation worldwide.",
    image: "https://source.unsplash.com/1600x900/?news,breaking",
    category: "Breaking News",
  };

  const trendingStories = [
    {
      id: 1,
      title: "Tech Giants Report Record Profits",
      date: "2025-08-27",
      image: "https://source.unsplash.com/400x300/?technology",
    },
    {
      id: 2,
      title: "Sports Fans Celebrate Historic Win",
      date: "2025-08-27",
      image: "https://source.unsplash.com/400x300/?sports",
    },
    {
      id: 3,
      title: "Entertainment World Mourns a Legend",
      date: "2025-08-27",
      image: "https://source.unsplash.com/400x300/?entertainment",
    },
  ];

  return (
    <div className="space-y-24 max-w-7xl mx-auto px-4">
      {/* Hero + Featured Section */}
      <Suspense fallback={<div>Loading Hero...</div>}>
        <HeroFeaturedSection
          featured={featuredStory}
          trending={trendingStories}
        />
      </Suspense>

      <AdSlot type="hero" />

      <Suspense fallback={<div>Loading Top News...</div>}>
        <TopNewsSection articles={topNews} />
      </Suspense>

      <AdSlot type="inline" />

      <Suspense fallback={<div>Loading Sports...</div>}>
        <SportsSection articles={sports} />
      </Suspense>

      <AdSlot type="leaderboard" />

      <Suspense fallback={<div>Loading Politics...</div>}>
        <PoliticsSection articles={politics} />
      </Suspense>

      <AdSlot type="leaderboard" />

      <Suspense fallback={<div>Loading Technology...</div>}>
        <TechnologySection articles={technology} />
      </Suspense>

      <AdSlot type="leaderboard" />

      <Suspense fallback={<div>Loading Business...</div>}>
        <BusinessSection articles={business} />
      </Suspense>

      <AdSlot type="leaderboard" />

      <Suspense fallback={<div>Loading Entertainment...</div>}>
        <EntertainmentSection articles={entertainment} />
      </Suspense>

      <AdSlot type="leaderboard" />

      <Suspense fallback={<div>Loading World News...</div>}>
        <WorldNewsSection articles={worldNews} />
      </Suspense>
    </div>
  );
}
