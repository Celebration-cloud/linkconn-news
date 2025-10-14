/* eslint-disable no-undef */
import { enforcePlacement } from "@/lib/actions/placementManager";
import { databases, ID } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

const collectionId = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SAVES_ID; // Replace with your actual collection ID
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function POST(req) {
  try {
    // Auth
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Request body
    const body = await req.json();

    // Enforce placement rules before saving
    const validated = await enforcePlacement(body);

    // Save to DB
    const article = await databases.createDocument(
      dbId,
      collectionId,
      ID.unique(),
      {
        ...validated,
        authorId: userId,
      }
    );

    return Response.json({ success: true, data: article });
  } catch (error) {
    console.error("❌ Placement article creation error:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
