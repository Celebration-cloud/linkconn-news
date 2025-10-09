/* eslint-disable no-undef */
import { createClerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const clerkBackend = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET(req) {
  try {
    const { userId, sessionId: currentSessionId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await clerkBackend.sessions.getSessionList({ userId });
    console.log(sessions);
    // Example mapping when fetching sessions
    const sessionsList = sessions.data.map((s) => ({
      id: s.id,
      browser: s.latestActivity?.browserName || "Unknown",
      browserVersion: s.latestActivity?.browserVersion || "Unknown",
      os: s.latestActivity?.deviceType || "Unknown",
      ipAddress: s.ipAddress || "Unknown",
      city: s.latestActivity?.city || null,
      country: s.latestActivity?.country || null,
      isCurrent: s.id === currentSessionId,
      status: s.status,
      createdAt: s.createdAt,
      lastActiveAt: s.lastActiveAt,
      expireAt: s.expireAt,
      totalCount: sessions.totalCount,
    }));

    return NextResponse.json(sessionsList);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { userId, sessionId: currentSessionId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { all } = await req.json().catch(() => ({}));
    const sessions = await clerkBackend.sessions.getSessionList({ userId });

    if (all) {
      // revoke all except current
      await Promise.all(
        sessions.data
          .filter((s) => s.id !== currentSessionId)
          .map((s) => clerkBackend.sessions.revokeSession(s.id))
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

