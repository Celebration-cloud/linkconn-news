async function fetcher(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      credentials: "include",
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) throw new Error(data.error || "API Error");
  return data;
}

export async function createArticle(data) {
  return fetcher("/api/admin/article/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMyArticles({
  first,
  rows,
  sortField,
  sortOrder,
  filters,
}) {
  const params = new URLSearchParams({
    first: first.toString(),
    rows: rows.toString(),
  });

  if (sortField) params.append("sortField", sortField);
  if (sortOrder) params.append("sortOrder", sortOrder.toString());
  if (filters && Object.keys(filters).length > 0) {
    params.append("filters", JSON.stringify(filters));
  }

  return fetcher(`/api/admin/article/get?${params.toString()}`, {
    method: "GET",
  });
}
export async function updateArticle(articleId, data) {
  return fetcher("/api/admin/article/update", {
    method: "PUT",
    body: JSON.stringify({ articleId, ...data }),
  });
}

export async function fetchArticleById(articleId) {
  return fetcher(`/api/admin/article/${articleId}`, {
    method: "GET",
  });
}

export async function deleteArticle(articleId) {
  return fetcher("/api/admin/article/delete", {
    method: "DELETE",
    body: JSON.stringify({ articleId }),
  });
}
