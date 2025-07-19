import { databases } from "@/lib/appwrite";
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

    // Check if publisher exists for this user
    const existing = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
      "Publisher",
      [{ key: "userId", value: userId, operator: "equal" }]
    );

    if (existing.total === 0) {
      return Response.json(
        { success: false, error: "Publisher not found." },
        { status: 404 }
      );
    }

    // Delete the publisher document
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      "publisher",
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
