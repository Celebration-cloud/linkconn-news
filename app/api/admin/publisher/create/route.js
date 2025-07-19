import { databases, ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if publisher already exists
    const existing = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
      "687a7fc200174c8e82a6",
      [Query.equal("userId", userId)]
    );

    let publisherDoc;

    if (existing.total > 0) {
      // If exists, return the existing publisher
      publisherDoc = existing.documents[0];
    } else {
      // If not, create a new publisher
      publisherDoc = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
        "687a7fc200174c8e82a6",
        ID.unique(),
        {
          userId,
          published: 0,
          liked: 0,
          followers: 0,
          following: 0,
        }
      );
    }

    return Response.json({ success: true, data: publisherDoc });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
