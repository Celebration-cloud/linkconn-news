import { getLiveMainPageArticles } from "@/lib/services/newsService";

export async function getMainPageArticles() {
  try {
    return await getLiveMainPageArticles();
  } catch (err) {
    console.error("getMainPageArticles error:", err);
    return {
      breakingNews: [],
      topNews: [],
      sports: [],
      politics: [],
      technology: [],
      business: [],
      entertainment: [],
      worldNews: [],
    };
  }
}
