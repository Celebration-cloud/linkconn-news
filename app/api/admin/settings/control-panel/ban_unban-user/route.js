/* eslint-disable no-undef */
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

// Backend Clerk client
const clerkBackend = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const INVITES_COLLECTION_ID = "68a7f81700394fd0385f";

// 🔒 Ban / Unban user
export async function PUT(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId, action } = await req.json();
    console.log("targetUserId:", targetUserId);
    if (!targetUserId || !["ban", "unban"].includes(action)) {
      return NextResponse.json(
        { error: "Missing targetUserId or invalid action" },
        { status: 400 }
      );
    }
    // 1. Find the user by email
    const users = await clerkBackend.users.getUserList({
      id: [targetUserId],
      limit: 1,
    });
    const userEmail = users.data[0]?.emailAddresses[0]?.emailAddress;
    console.log(userEmail)
    if (!users.data.length) {
      throw new Error("User not found with that email");
    }

    // 2. Sync Appwrite publisher doc
    const existing = await databases.listDocuments(
      DB_ID,
      INVITES_COLLECTION_ID,
      [Query.equal("invitedEmail", userEmail)]
    );

    if (existing.total > 0) {
      const docId = existing.documents[0].$id;
      await databases.updateDocument(DB_ID, INVITES_COLLECTION_ID, docId, {
        banned: action === "ban" ? true : false,
      });
    }

    return NextResponse.json(
      { success: true, action, targetUserId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ban/Unban error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}