/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackInvestigations = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Investigation Report ${i + 1}`,
  slug: `investigation-report-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for investigation reports. Detailed journalism and analysis.",
  image: "https://source.unsplash.com/800x400/?investigation,crime",
  author: "Demo Author",
}));

export default async function InvestigationsPage({ searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [], total = 0 } = await getArticles({
    category: "investigations",
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
      sectionColor="red"
      sectionTitle="Investigations"
      sectionIcon="pi-search"
      sectionLink="/investigations"
      sectionUrlParams="investigations"
      ctaLabel="See all investigations"
      demoData={fallbackInvestigations}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
