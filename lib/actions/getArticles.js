/* eslint-disable no-undef */
"use server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

function emptyArticles(limit = 0, offset = 0) {
  return { documents: [], total: 0, limit, offset };
}

export async function getArticles({
  category,
  section,
  limit,
  placement,
  offset = 0,
  search,
} = {}) {
  try {
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (section) query.set("section", section);
    if (placement) query.set("placement", placement);
    if (limit) query.set("limit", limit);
    if (offset) query.set("offset", offset);
    if (search) query.set("search", search); // added search support

    const res = await fetch(`${baseUrl}/api/public/articles?${query}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("getArticles fetch failed, status:", res.status);
      return emptyArticles(limit, offset);
    }

    const json = await res.json();
    return json.success ? json.data : emptyArticles(limit, offset);
  } catch (err) {
    console.error("getArticles fetch error:", err);
    return emptyArticles(limit, offset);
  }
}


export async function getArticleBySlug(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${baseUrl}/api/public/articles/${slug}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("getArticleBySlug fetch failed, status:", res.status);
      return null;
    }

    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.error("getArticleBySlug fetch error:", err);
    return null;
  }
}

export async function getRelatedByCategory(newsSection, excludeSlug, limit = 4) {
  if (!newsSection) return [];

  try {
    const data = await getArticles({ section: newsSection, limit: limit + 1 });
    if (!data?.documents) return [];

    // Exclude the current article
    const related = data.documents.filter((doc) => doc.slug !== excludeSlug);

    return related.slice(0, limit);
  } catch (err) {
    console.error("getRelatedByCategory error:", err);
    return [];
  }
}
