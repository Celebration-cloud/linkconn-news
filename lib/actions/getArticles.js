"use server";

import {
  getLiveArticles,
  getLiveArticleBySlug,
} from "@/lib/services/newsService";

export async function getArticles(params = {}) {
  try {
    return await getLiveArticles(params);
  } catch (err) {
    console.error("getArticles error:", err);
    return { documents: [], total: 0, limit: params.limit || 0, offset: params.offset || 0 };
  }
}
export async function getArticleBySlug(slug) {
  if (!slug) return null;
  try {
    return await getLiveArticleBySlug(slug);
  } catch (err) {
    console.error("getArticleBySlug error:", err);
    return null;
  }
}

export async function getRelatedByCategory(newsSection, excludeSlug, limit = 4) {
  if (!newsSection) return [];

  try {
    const data = await getLiveArticles({ section: newsSection, limit: limit + 2 });
    if (!data?.documents) return [];

    const related = data.documents.filter((doc) => doc.slug !== excludeSlug);
    return related.slice(0, limit);
  } catch (err) {
    console.error("getRelatedByCategory error:", err);
    return [];
  }
}
