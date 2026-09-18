/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/shared/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

export default async function LatestPage({ searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 12;
  const offset = (page - 1) * limit;

  const { documents = [], total = 0 } = await getArticles({
    limit,
    offset,
  });

  const mappedArticles = documents.map((a) => ({
    ...a,
    id: a.$id || a.id,
    title: a.title,
    slug: a.slug,
    summary: a.summary,
    date: a.$createdAt || a.publishedAt,
    image: a.cover,
    author: a.authorName,
    section: a.section || a.newsSection || "Latest",
  }));

  return (
    <SectionLayout
      sectionTitle="Latest Dispatches"
      sectionLink="/latest"
      ctaLabel="Latest stories"
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
