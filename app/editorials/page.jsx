/* eslint-disable react/react-in-jsx-scope */
"use client";
import SectionLayout from "@/components/news-layout/SectionLayout";

// Demo data
const demoEditorials = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  title: `Editorial Headline ${i + 1}`,
  date: "2025-08-28",
  summary: "This is a demo summary for the editorial article.",
  image: "https://via.placeholder.com/800x400",
}));

export default function EditorialsPage() {
  return (
    <SectionLayout
      sectionColor="purple"
      sectionTitle="Editorials"
      sectionIcon="pi-edit"
      sectionLink="/editorials"
      ctaLabel="See all editorials"
      demoData={demoEditorials}
    />
  );
}
