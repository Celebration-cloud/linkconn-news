/* eslint-disable no-undef */
// Helper to handle fetch and JSON response

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

export async function createPublisher() {
  return fetcher("/api/admin/publisher/create", {
    method: "POST",
  });
}

// Get publisher (accepts optional query params as object)
export async function getPublisher(params = {}) {
  const query = new URLSearchParams(params).toString();

  const baseURL =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000" // fallback for local dev
      : "";

  const url = `${baseURL}/api/admin/publisher/get?${query}`;

  return fetcher(url, { method: "GET" });
}


// Update publisher (accepts data object)
export async function updatePublisher(data) {
  return fetcher("/api/admin/publisher/update", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deletePublisher() {
  return fetcher("/api/admin/publisher/delete", {
    method: "DELETE",
  });
}
