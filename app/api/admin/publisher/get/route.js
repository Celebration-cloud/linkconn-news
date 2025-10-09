/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId;
    console.log(userId);

    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Use the correct collection ID from your Appwrite dashboard
    const collectionId = "687a7fc200174c8e82a6"; // <-- Replace with your actual collection ID if different

    // Use Appwrite's Query helper for correct query syntax
    const existing = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
      collectionId,
      [Query.equal("userId", userId)]
    );

    if (existing.total === 0) {
      return Response.json(
        { success: false, error: "Publisher not found." },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: existing.documents });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
