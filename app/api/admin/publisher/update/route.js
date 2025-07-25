import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";
import { Query } from "appwrite";

export async function PUT(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { published, liked, followers, following } = await req.json();
    console.log(published)
    const collectionId = "687a7fc200174c8e82a6"; // your actual collection ID

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

    const publisherId = existing.documents[0].$id;

    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
      collectionId,
      publisherId,
      {
        published,
        liked,
        followers,
        following,
      },
    );

    return Response.json({ success: true, data: response });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
