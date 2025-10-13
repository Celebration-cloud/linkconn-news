/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionLayout from "@/components/shared/news-layout/SectionLayout";
import { getArticles } from "@/lib/actions/getArticles";

// Demo data for fallback
const fallbackWeather = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Weather Update ${i + 1}`,
  slug: `weather-update-${i + 1}`,
  date: "2025-08-28",
  summary:
    "This is a demo summary for weather reports. Covers forecasts, climate, and conditions.",
  image: "https://source.unsplash.com/800x400/?weather,climate",
  author: "Demo Author",
}));

export default async function WeatherPage({ searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [], total = 0 } = await getArticles({
    section: "weather",
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
      sectionColor="indigo"
      sectionTitle="Weather"
      sectionIcon="pi-sun"
      sectionLink="/weather"
      sectionUrlParams="weather"
      ctaLabel="See all weather"
      demoData={fallbackWeather}
      articleData={mappedArticles}
      limit={limit}
      totalCount={total}
      currentPage={page}
    />
  );
}
