import { databases, ID } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

// COLLECTION ID
const collectionId = "687bbd84001df808c851"; // Replace with your actual collection ID
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const article = await databases.createDocument(
      dbId,
      collectionId,
      ID.unique(),
      {
        ...body,
        authorId: userId,
      }
    );

    return Response.json({ success: true, data: article });
  } catch (error) {
    console.error("❌ Article creation error:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
