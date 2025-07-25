import { databases, ID } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";
import { Query } from "appwrite";

// COLLECTION ID
const collectionId = "687bbd84001df808c851"; // Replace with your actual collection ID
// eslint-disable-next-line no-undef
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
      Query.equal("authorId", userId),
      Query.orderDesc("$createdAt"),
    ]);

    return Response.json({ success: true, data: articles.documents });
  } catch (error) {
    console.error("❌ Failed to fetch articles:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
