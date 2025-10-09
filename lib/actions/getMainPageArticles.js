import { getArticles } from "@/lib/actions/getArticles";

export async function getMainPageArticles() {
  // Fetch articles by section
  const breakingNewsArticles = getArticles({
    placement: "breaking-news",
    limit: 6,
    offset: 0,
  });
  const topNewsArticles = getArticles({
    placement: "top-stories",
    limit: 6,
    offset: 0,
  });
  const sportsArticles = getArticles({
    section: "Sports",
    limit: 6,
    offset: 0,
  });
  const politicsArticles = getArticles({
    section: "Politics",
    limit: 6,
    offset: 0,
  });
  const technologyArticles = getArticles({
    section: "Technology",
    limit: 6,
    offset: 0,
  });
  const businessArticles = getArticles({
    section: "Business",
    limit: 6,
    offset: 0,
  });
  const entertainmentArticles = getArticles({
    section: "Entertainment",
    limit: 6,
    offset: 0,
  });
  const worldNewsArticles = getArticles({
    section: "World",
    limit: 6,
    offset: 0,
  });

  const [
    breakingNews,
    topNews,
    sports,
    politics,
    technology,
    business,
    entertainment,
    worldNews,
  ] = await Promise.all([
    breakingNewsArticles,
    topNewsArticles,
    sportsArticles,
    politicsArticles,
    technologyArticles,
    businessArticles,
    entertainmentArticles,
    worldNewsArticles,
  ]);

  return {
    breakingNews: breakingNews.documents,
    topNews: topNews.documents,
    sports: sports.documents,
    politics: politics.documents,
    technology: technology.documents,
    business: business.documents,
    entertainment: entertainment.documents,
    worldNews: worldNews.documents,
  };
}
