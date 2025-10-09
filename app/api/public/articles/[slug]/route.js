/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

const collectionId = "687bbd84001df808c851";
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function GET(req, { params }) {
  try {
    const { slug } = params;
    console.log("Fetching article with slug:", slug);

    if (!slug) {
      return Response.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const res = await databases.listDocuments(dbId, collectionId, [
      Query.equal("slug", slug),
      Query.limit(1),
    ]);

    if (!res.documents.length) {
      return Response.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: res.documents[0] });
  } catch (err) {
    console.error("❌ getArticleBySlug API error:", err);
    return Response.json(
      { success: false, error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
