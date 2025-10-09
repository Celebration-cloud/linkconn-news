/* eslint-disable no-undef */
import { NextResponse } from "next/server";
import { ID, Query } from "appwrite";
import { databases } from "@/lib/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const COLLECTION_ID = "68dfd833002f34f00628";

function buildTree(comments, parentId = null) {
  return comments
    .filter((c) => c.parentId === parentId)
    .map((c) => ({
      ...c,
      replies: buildTree(comments, c.$id), // recursion for infinite nesting
    }));
}
// ✅ Utility function to count total likes and dislikes (including nested replies)
// function countLikesAndDislikes(comments) {
//   let totalLikes = 0;
//   let totalDislikes = 0;

//   const traverse = (list) => {
//     list.forEach((comment) => {
//       totalLikes += comment.likes || 0;
//       totalDislikes += comment.dislikes || 0;

//       if (comment.replies && comment.replies.length > 0) {
//         traverse(comment.replies);
//       }
//     });
//   };
  

//   traverse(comments);
//   return { totalLikes, totalDislikes };
// }

export const getVoteCounts = (userVotes = []) => {
  const totalLikes = userVotes.filter((v) => v.endsWith(":like")).length;
  const totalDislikes = userVotes.filter((v) => v.endsWith(":dislike")).length;
  return { totalLikes, totalDislikes };
};


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
    }

    // ✅ Fetch all comments flat
    const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("articleId", articleId),
      Query.orderAsc("$createdAt"),
    ]);

    const comments = res.documents || [];
    console.log("api comment: ", comments)
    const { totalLikes, totalDislikes } = getVoteCounts(comments.flatMap(c => c.userVotes || []));

    console.log("Likes:", totalLikes);
    console.log("Dislikes:", totalDislikes);

    // ✅ Build recursive nested structure
    const structuredComments = buildTree(comments);

    return NextResponse.json({
      totalComments: res.total,
      comments: structuredComments,
      totalLikes,
      totalDislikes,
    });
  } catch (err) {
    console.error("❌ Error in GET /api/comments:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}


// ✅ POST comment
export async function POST(req) {
  try {
    const body = await req.json();
    const { articleId, parentId, authorId, authorName, avatar, content } = body;

    if (!articleId || !authorId || !authorName || !avatar || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newComment = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        articleId,
        parentId: parentId || null,
        authorId,
        authorName,
        avatar,
        content,
        likes: 0,
        dislikes: 0,
      }
    );

    // ✅ log for debugging
    console.log("✅ New comment created:", newComment);

    return NextResponse.json(newComment);
  } catch (err) {
    console.error("❌ Error in POST /api/comments:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
