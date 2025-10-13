/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/shared/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackEducationNews = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Education News Headline ${i + 1}`,
  slug: `education-headline-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for education news. Includes learning, schools, research, and policies.",
  image: "https://source.unsplash.com/800x400/?education,school",
  author: "Demo Author",
}));

export default async function EducationPage({ searchParams }) {
  // Grab pagination params
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch real articles by section
  const { documents = [], total = 0 } = await getArticles({
    section: "education",
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
      sectionColor="orange"
      sectionTitle="Education"
      sectionIcon="pi-book"
      sectionLink="/education"
      sectionUrlParams="education"
      ctaLabel="See all education"
      demoData={fallbackEducationNews}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
