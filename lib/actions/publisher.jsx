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

// Create publisher (accepts data object)
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

// Delete publisher (accepts data object, e.g. for custom delete logic)
export async function deletePublisher(data = {}) {
  return fetcher("/api/admin/publisher/delete", {
    method: "DELETE",
    body: Object.keys(data).length ? JSON.stringify(data) : undefined,
  });
}
