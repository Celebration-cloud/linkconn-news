/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/shared/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackSports = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Sports News Headline ${i + 1}`,
  slug: `sports-headline-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for the sports article. It provides a short overview of the story.",
  image: "https://source.unsplash.com/800x400/?sports",
  author: "Demo Author",
}));

export default async function SportsPage({ searchParams }) {
  // Grab pagination params
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch real articles by section
  const { documents = [], total = 0 } = await getArticles({
    section: "sports",
    limit,
    offset,
  });

  // Map DB fields to SectionLayout format
  const mappedArticles =
    documents.length > 0
      ? documents.map((a) => ({
          ...a,
          id: a.$id || a.id,
          title: a.title,
          slug: a.slug,
          summary: a.summary,
          date: a.$createdAt || a.publishedAt,
          image: a.cover,
          author: a.authorName,
          section: a.section || a.newsSection || "Sports",
        }))
      : [];

  return (
    <SectionLayout
      sectionColor="amber"
      sectionTitle="Sports"
      sectionLink="/sports"
      sectionUrlParams="sports"
      ctaLabel="See all sports"
      demoData={fallbackSports}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
