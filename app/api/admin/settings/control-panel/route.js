/* eslint-disable no-undef */
// app/api/admin/settings/control-panel/route.js

/**
 * API for managing Clerk users (invite, list, update role, delete)
 */
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";

// Backend Clerk client
const clerkBackend = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const INVITES_COLLECTION_ID = "68a7f81700394fd0385f";

/**
 * POST - Invite a user and persist invitedBy mapping in Appwrite
 */
export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // ✅ Create Clerk invitation
    const invitation = await clerkBackend.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/accept-invite`,
      publicMetadata: { role: role || "user" },
      privateMetadata: { invitedBy: userId },
    });

    // ✅ Ensure invitedBy is stored in Appwrite
    const existing = await databases.listDocuments(
      DB_ID,
      INVITES_COLLECTION_ID,
      [Query.equal("invitedEmail", email)] // fixed field
    );

    if (existing.documents.length === 0) {
      // If no record, create one
      await databases.createDocument(
        DB_ID,
        INVITES_COLLECTION_ID,
        ID.unique(),
        {
          invitedEmail: email,
          invitedBy: userId,
        }
      );
    } else {
      // If exists, update
      const docId = existing.documents[0].$id;
      await databases.updateDocument(DB_ID, INVITES_COLLECTION_ID, docId, {
        invitedBy: userId,
      });
    }

    return NextResponse.json({ data: invitation }, { status: 201 });
  } catch (err) {
    console.error(
      "Clerk Invitation Error:",
      JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
    );
    return NextResponse.json(
      { error: err.errors?.[0]?.message || err.message || "Unknown error" },
      { status: err.status || 500 }
    );
  }
}

// List users
export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 1. Fetch Clerk users
  const { data: clerkUsers } = await clerkBackend.users.getUserList({ limit: 100 });

  // 2. Fetch Appwrite invite records for this inviter
  const invites = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
    "68a7f81700394fd0385f", // invites collection
    [Query.equal("invitedBy", userId)]
  );

  const allInvite = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID,
    "68a7f81700394fd0385f", // invites collection
  );
  console.log(allInvite)
  // 3. Map Clerk users into a quick lookup by email
  const clerkByEmail = Object.fromEntries(
    clerkUsers.map((u) => [
      u.emailAddresses?.[0]?.emailAddress ?? "",
      u,
    ])
  );

  // 4. Merge: for each invite, return either the real Clerk user or a "pending" placeholder
  const mapped = invites.documents.map((invite) => {
    const email = invite.invitedEmail;
    const user = clerkByEmail[email];

    if (user) {
      // ✅ User exists in Clerk
      return {
        id: user.id,
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.publicMetadata?.role ?? "user",
        invitedBy: invite.invitedBy,
        status: "accepted",
        createdAt: user.createdAt,
        banned: invite.banned,
      };
    } else {
      // ⏳ Pending (invite sent, but user not registered yet)
      return {
        id: null, // no Clerk user yet
        email,
        role: "user",
        invitedBy: invite.invitedBy,
        status: "pending",
        createdAt: invite.$createdAt, // use Appwrite invite timestamp
      };
    }
  });

  return NextResponse.json({ data: mapped, allInvite }, { status: 200 });
}


// Update user role
export async function PATCH(req) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { targetUserId, role } = await req.json();
  if (!targetUserId || !role)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const updated = await clerkBackend.users.updateUser(targetUserId, {
    publicMetadata: { role: role || "user" },
  });

  const cleanUser = {
    id: updated.id,
    email: updated.emailAddresses?.[0]?.emailAddress || null,
    role: updated.publicMetadata?.role || "user",
    createdAt: updated.createdAt,
    image: updated.imageUrl || null,
  };

  return NextResponse.json(cleanUser, { status: 200 });
}

// Delete user
export async function DELETE(req) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { targetUserId } = await req.json();
  if (!targetUserId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  // Delete from Clerk
  await clerkBackend.users.deleteUser(targetUserId);

  // Delete from Appwrite (publisher collection)
  const existing = await databases.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal("userId", targetUserId),
  ]);

  if (existing.total > 0) {
    await databases.deleteDocument(
      DB_ID,
      COLLECTION_ID,
      existing.documents[0].$id
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
