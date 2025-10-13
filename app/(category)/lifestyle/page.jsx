/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/shared/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackLifestyle = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Lifestyle Story ${i + 1}`,
  slug: `lifestyle-story-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for lifestyle articles. Covers fashion, travel, food, and trends.",
  image: "https://source.unsplash.com/800x400/?lifestyle,travel",
  author: "Demo Author",
}));

export default async function LifestylePage({ searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [], total = 0 } = await getArticles({
    category: "lifestyle",
    limit,
    offset,
  });

  const mappedArticles =
    documents.length > 0
      ? documents.map((a) => ({
          id: a.$id,
          title: a.title,
          slug: a.slug,
          summary: a.summary,
          date: a.$createdAt,
          image: a.cover,
          author: a.authorName,
        }))
      : [];

  return (
    <SectionLayout
      sectionColor="teal"
      sectionTitle="Lifestyle"
      sectionIcon="pi-star"
      sectionLink="/lifestyle"
      sectionUrlParams="lifestyle"
      ctaLabel="See all lifestyle"
      demoData={fallbackLifestyle}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
