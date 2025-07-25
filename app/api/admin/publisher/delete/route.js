import { databases } from "@/lib/appwrite";
import { Permission, Query, Role } from "appwrite";
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
    const collectionId = "687a7fc200174c8e82a6"; // <-- Replace with your actual collection ID if different

    const existing = await databases.listDocuments(dbId, collectionId, [
      Query.equal("userId", userId),
    ]);

    if (existing.total === 0) {
      return Response.json(
        { success: false, error: "Publisher not found." },
        { status: 404 }
      );
    }

    await databases.deleteDocument(
      dbId,
      collectionId,
      existing.documents[0].$id
    );

    return Response.json({
      success: true,
      message: "Publisher deleted successfully.",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
