/* eslint-disable react/react-in-jsx-scope */
"use client";
import SectionLayout from "@/components/news-layout/SectionLayout";

// Demo data
const demoLatest = Array.from({ length: 52 }).map((_, i) => ({
  id: i + 1,
  title: `Latest Headline ${i + 1}`,
  date: "2025-08-28",
  summary: "This is a demo summary for the latest article.",
  image: "https://via.placeholder.com/800x400",
}));

export default function LatestPage() {
  return (
    <SectionLayout
      sectionColor="green"
      sectionTitle="Latest"
      sectionIcon="pi-clock"
      sectionLink="/latest"
      ctaLabel="See all latest news"
      demoData={demoLatest}
    />
  );
}
