import { createClerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const clerkBackend = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = params;

    await clerkBackend.sessions.revokeSession(sessionId);

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
