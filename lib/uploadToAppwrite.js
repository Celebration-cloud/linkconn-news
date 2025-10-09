/* eslint-disable no-undef */
import { ID, storage } from "./appwrite";

export async function deleteCoverFromAppwrite(fileUrl) {
  try {
    const parts = fileUrl.split("/");

    // This gets the ID right before "/view" or "/preview"
    const fileIdIndex = parts.findIndex((part) => part === "files") + 1;
    const fileId = parts[fileIdIndex];

    if (!fileId) throw new Error("Could not extract file ID from URL");

    await storage.deleteFile(
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_BUCKET_ID,
      fileId
    );

    return true;
  } catch (err) {
    console.error("❌ Failed to delete image:", err.message);
    throw err;
  }
}


export async function uploadCoverToAppwrite(file) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_BUCKET_ID;

  if (!file) throw new Error("No file provided");

  const uploaded = await storage.createFile(bucketId, ID.unique(), file);

  const fileUrl = storage.getFileView(bucketId, uploaded.$id).toString(); // ← 🔥 FIXED

  return {
    fileId: uploaded.$id,
    url: fileUrl,
  };
}