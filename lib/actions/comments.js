// ✅ Utility to fetch all comments
export async function getComments(
  articleId,
  parentId = null,
  limit = 5,
  offset = 0
) {
  const url = new URL("/api/admin/comments", window.location.origin);
  url.searchParams.set("articleId", articleId);
  if (parentId) url.searchParams.set("parentId", parentId);
  url.searchParams.set("limit", limit);
  url.searchParams.set("offset", offset);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });
  return res.json();
}



export async function addComment(data) {
  const res = await fetch(`/api/admin/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// lib/actions/comments.js
export async function voteComment(commentId, type, userId) {
  const res = await fetch("/api/admin/comments/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ commentId, userId, voteType: type }), // ✅ match API
  });

  if (!res.ok) throw new Error("Failed to vote");

  const data = await res.json();
  const updated = data.updated || {};

  return {
    commentId,
    userId,
    likes: updated.likes || 0,
    dislikes: updated.dislikes || 0,
    userVotes: updated.userVotes || [],
  };
}

