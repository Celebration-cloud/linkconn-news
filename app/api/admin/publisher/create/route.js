/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";

const collectionId = "687a7fc200174c8e82a6";
const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;


export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      // Create publisher doc (id = userId enforces uniqueness)
      const publisherDoc = await databases.createDocument(
        DB_ID,
        collectionId,
        userId,
        {
          userId,
          published: 0,
          liked: 0,
          followers: 0,
          following: 0,
        }
      );


      return Response.json({
        success: true,
        publisher: publisherDoc,
      });
    } catch (err) {
      if (err.code === 409) {
        // Already exists
        const existing = await databases.getDocument(
          DB_ID,
          collectionId,
          userId
        );
        return Response.json({
          success: true,
          data: existing,
        });
      }
      throw err;
    }
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
