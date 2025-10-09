/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackFeatures = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Feature Story ${i + 1}`,
  slug: `feature-story-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for feature stories. In-depth reporting and narratives.",
  image: "https://source.unsplash.com/800x400/?features,story",
  author: "Demo Author",
}));

export default async function FeaturesPage({ searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [], total = 0 } = await getArticles({
    category: "features",
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
      sectionColor="blue"
      sectionTitle="Features"
      sectionIcon="pi-bookmark"
      sectionLink="/features"
      sectionUrlParams="features"
      ctaLabel="See all features"
      demoData={fallbackFeatures}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
