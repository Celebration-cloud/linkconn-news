export async function fetchPlacements() {
  const res = await fetch("/api/admin/article/placement");
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function updatePlacement(articleId, placement) {
  const res = await fetch(`/api/admin/article/placement/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ placement }),
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}
