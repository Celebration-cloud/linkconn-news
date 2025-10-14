/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

const collectionId = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SAVES_ID; // replace with your collection ID
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function PATCH(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params; // articleId
    const body = await req.json();

    // Only update placement for now
    const updated = await databases.updateDocument(dbId, collectionId, id, {
      placement: body.placement,
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("❌ Placement update error:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
