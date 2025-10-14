/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SAVES_ID;

export async function DELETE(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { articleId } = await req.json();
    if (!articleId) {
      return Response.json(
        { success: false, error: "Missing articleId" },
        { status: 400 }
      );
    }

    await databases.deleteDocument(dbId, collectionId, articleId);
    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
