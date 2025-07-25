// app/api/admin/article/[articleId]/route.js
/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const collectionId = "687bbd84001df808c851"; // Replace with your actual collection ID

export async function GET(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { articleId } = params;
    if (!articleId) {
      return Response.json(
        { success: false, error: "Missing articleId" },
        { status: 400 }
      );
    }

    const article = await databases.getDocument(dbId, collectionId, articleId);
    return Response.json({ success: true, data: article });
  } catch (error) {
    console.error("❌ GET Article Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
