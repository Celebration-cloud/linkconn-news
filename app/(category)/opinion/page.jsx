/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/shared/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackOpinion = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Opinion Piece ${i + 1}`,
  slug: `opinion-piece-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for opinion articles. Features editorials, commentaries, and viewpoints.",
  image: "https://source.unsplash.com/800x400/?opinion,editorial",
  author: "Demo Author",
}));

export default async function OpinionPage({ searchParams }) {
  // Grab pagination params
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch real articles by section
  const { documents = [], total = 0 } = await getArticles({
    category: "opinion",
    limit,
    offset,
  });

  // Map DB fields to SectionLayout format
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
      sectionColor="pink"
      sectionTitle="Opinion"
      sectionIcon="pi-comment"
      sectionLink="/opinion"
      sectionUrlParams="opinion"
      ctaLabel="See all opinion"
      demoData={fallbackOpinion}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
