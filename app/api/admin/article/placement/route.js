/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

const collectionId = "687bbd84001df808c851"; // replace with your collection ID
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const articles = await databases.listDocuments(dbId, collectionId, [
      // Add queries here if needed, e.g. pagination
    ]);

    return Response.json({ success: true, data: articles.documents });
  } catch (error) {
    console.error("❌ Placement fetch error:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
