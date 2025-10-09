import { account } from "@/lib/appwrite"; // Make sure env is loaded
import { cookies } from "next/headers"; // Only in Next.js 13+ (app dir)

export async function validateAppwriteSession() {
  try {
    const cookieJar = cookies();
    const sessionCookie = cookieJar.get("a_session_projectId");

    if (!sessionCookie) return false;

    // This call will throw if session is invalid
    const user = await account.get();
    return !!user;
  } catch (error) {
    console.error("Error validating Appwrite session:", error);
    return false;
  }
}

// export function validateAppwriteSession(req) {
//   const cookies = req.cookies.getAll();

//   // Appwrite session cookies look like: a_session_PROJECTID
//   const session = cookies.find((cookie) =>
//     cookie.name.startsWith("a_session_")
//   );

//   return Boolean(session);
// }

