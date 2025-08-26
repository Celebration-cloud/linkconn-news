// // middleware.ts
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /**
//  * Route matchers — make it easy to check whether the current request
//  * is for a specific route group (admin or writer).
//  */
// const isAdminRoute = createRouteMatcher(["/admin/settings(.*)"]);
// const isWriterRoute = createRouteMatcher(["/admin(.*)"]);

// /**
//  * Clerk Middleware
//  *
//  * Runs before every request that matches the `config.matcher` below.
//  * Used to enforce authentication and role-based access control.
//  */
// export default clerkMiddleware((auth, req) => {
//   const { userId, sessionClaims } = auth();

//   // 🚫 Block unauthenticated users
//   if (!userId) {
//     return auth().redirectToSignIn({ returnBackUrl: req.url });
//   }

//   const role = sessionClaims?.publicMetadata?.role;

//   // ✅ Restrict /admin/* routes to admins only
//   if (isAdminRoute(req) && role !== "admin") {
//     return new Response("Forbidden: Admins only", { status: 403 });
//   }

//   // ✅ Restrict /writer/* routes to admin OR writer
//   if (isWriterRoute(req) && !["admin", "writer"].includes(role)) {
//     return new Response("Forbidden: Writers/Admins only", { status: 403 });
//   }
// });

// /**
//  * Middleware Configuration
//  *
//  * - Protects `/admin/*` and `/writer/*` routes.
//  * - Also protects all API routes (`/api/*`).
//  * - Skips Next.js internals (`_next/*`) and static files.
//  */
// export const config = {
//   matcher: [
//     // Match all /admin routes
//     "/admin((?!/login).*)", // protect everything under /admin except /admin/login
//     "/admin/dashboard",
//     "/admin/publish",
//     "/admin/content-library",
//     "/admin/settings",
//     "/admin/settings/control-panel",
//     "/admin/settings/manage-device",
//     "/admin/content-library/comments",

//     // Also match API routes
//     "/api/(.*)",

//     // Skip static files and Next internals
//     "/((?!_next|.*\\..*).*)",
//   ],
// };

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all /admin routes
    "/admin((?!/login).*)", // protect everything under /admin except /admin/login
    "/admin/dashboard",
    "/admin/publish",
    "/admin/content-library",
    "/admin/settings",
    "/admin/settings/control-panel",
    "/admin/settings/manage-device",
    "/admin/content-library/comments",

    // Also match API routes
    "/api/(.*)",

    // Skip static files and Next internals
    "/((?!_next|.*\\..*).*)",
  ],
};
