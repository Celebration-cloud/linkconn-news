import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function randomId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST() {
  const cookieStore = cookies();
  let visitorId = cookieStore.get("visitor_id")?.value;

  if (!visitorId) {
    visitorId = randomId();
  }

  
  const res = NextResponse.json({ ok: true });
  // only set if not already there
  if (!cookieStore.get("visitor_id")) {
    res.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return res;
}
