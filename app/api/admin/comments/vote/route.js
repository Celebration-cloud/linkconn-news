/* eslint-disable no-undef */
import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_COMMENTS_ID;

/**
 * Handles voting (like/dislike) on a comment.
 * Supports toggle behavior and ensures only one vote per user.
 */
export async function POST(req) {
  try {
    const { commentId, userId, voteType } = await req.json(); // voteType: "like" | "dislike"

    if (!commentId || !userId || !voteType)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // ✅ Fetch comment
    const comment = await databases.getDocument(
      DB_ID,
      COLLECTION_ID,
      commentId
    );

    // Ensure votes array exists
    let userVotes = Array.isArray(comment.userVotes)
      ? [...comment.userVotes]
      : [];

    const voteKey = `${userId}:${voteType}`;
    const hasVotedSame = userVotes.includes(voteKey);

    // ✅ Remove any previous vote by this user (either like or dislike)
    userVotes = userVotes.filter((v) => !v.startsWith(`${userId}:`));

    // ✅ Add new vote only if not toggling same one off
    if (!hasVotedSame) userVotes.push(voteKey);

    // ✅ Recalculate like/dislike counts
    const likes = userVotes.filter((v) => v.endsWith(":like")).length;
    const dislikes = userVotes.filter((v) => v.endsWith(":dislike")).length;

    // ✅ Update in Appwrite
    const updated = await databases.updateDocument(
      DB_ID,
      COLLECTION_ID,
      commentId,
      {
        userVotes,
        likes,
        dislikes,
      }
    );

    // ✅ Return the updated document for the slicer
    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ Error in POST /api/admin/comments/vote:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
