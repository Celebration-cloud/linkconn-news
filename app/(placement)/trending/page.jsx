/* eslint-disable react/react-in-jsx-scope */
"use client";
import SectionLayout from "@/components/shared/news-layout/SectionLayout";

// Demo data
const demoTrending = Array.from({ length: 48 }).map((_, i) => ({
  id: i + 1,
  title: `Trending Headline ${i + 1}`,
  date: "2025-08-28",
  summary: "This is a demo summary for the trending article.",
  image: "https://via.placeholder.com/800x400",
}));

export default function TrendingPage() {
  return (
    <SectionLayout
      sectionColor="red"
      sectionTitle="Trending"
      sectionIcon="pi-trending-up"
      sectionLink="/trending"
      ctaLabel="See all trending"
      demoData={demoTrending}
    />
  );
}
