// app/api/public/clicks/[slug]/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { databases, ID, Query } from "@/lib/appwrite"; // keep commented for now

function randomId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Appwrite IDs (fill when ready)
// const DB_ID = process.env.APPWRITE_DB_ID;
// const ARTICLES = process.env.APPWRITE_ARTICLES_COLLECTION;
// const ARTICLE_CLICKS = process.env.APPWRITE_CLICKS_COLLECTION;

export async function POST(req, { params }) {
  const { slug } = params;

  const cookieStore = cookies();
  let visitorId = cookieStore.get("visitor_id")?.value;
  const shouldSetCookie = !visitorId;
  if (!visitorId) visitorId = randomId();

  // === DEDUPE KEY (local only for now) ===
  const dedupeKey = `click:${slug}:${visitorId}`;
  // you could store this in Appwrite later (article_clicks collection)
  // right now, it's just a placeholder

  let clicks = 0;

  // === Appwrite logic (commented out for now) ===
  /*
  // 1. Lookup article by slug
  const articleRes = await databases.listDocuments(DB_ID, ARTICLES, [
    Query.equal("slug", slug),
  ]);
  if (!articleRes.total) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  const article = articleRes.documents[0];
  clicks = article.clicks || 0;

  // 2. Check dedupe (within 6h)
  const now = new Date();
  const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  const visitRes = await databases.listDocuments(DB_ID, ARTICLE_CLICKS, [
    Query.equal("articleId", article.$id),
    Query.equal("visitorId", visitorId),
    Query.greater("expiresAt", sixHoursAgo.toISOString()),
  ]);

  if (!visitRes.total) {
    // Increment click count
    clicks = clicks + 1;
    await databases.updateDocument(DB_ID, ARTICLES, article.$id, { clicks });

    // Add dedupe entry expiring in 6h
    const expiresAt = new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString();
    await databases.createDocument(DB_ID, ARTICLE_CLICKS, ID.unique(), {
      articleId: article.$id,
      visitorId,
      expiresAt,
    });
  }
  */

  // === Response ===
  const res = NextResponse.json({ clicks });

  if (shouldSetCookie) {
    res.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return res;
}

export async function GET(req, { params }) {
  const { slug } = params;
  let clicks = 0;

  // === Appwrite logic (commented out for now) ===
  /*
  const articleRes = await databases.listDocuments(DB_ID, ARTICLES, [
    Query.equal("slug", slug),
  ]);
  if (articleRes.total) {
    clicks = articleRes.documents[0].clicks || 0;
  }
  */

  return NextResponse.json({ clicks });
}
