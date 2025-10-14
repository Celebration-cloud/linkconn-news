/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
// import { getAuth } from "@clerk/nextjs/server";

const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SAVES_ID; // Replace with your real ID

export async function PUT(req) {
  try {
    // const { userId } = getAuth(req);
    // if (!userId) {
    //   return Response.json(
    //     { success: false, error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const { articleId, ...updates } = await req.json();
    if (!articleId) {
      return Response.json(
        { success: false, error: "Missing articleId" },
        { status: 400 }
      );
    }

    const updated = await databases.updateDocument(
      dbId,
      collectionId,
      articleId,
      {
        ...updates,
      }
    );

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("❌ Update Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
