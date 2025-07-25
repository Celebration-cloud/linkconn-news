async function fetcher(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API Error");
  return data;
}

export async function createArticle(data) {
  return fetcher("/api/admin/article/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMyArticles() {
  return fetcher("/api/admin/article/get", {
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