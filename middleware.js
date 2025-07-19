import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all /admin routes
    "/admin((?!/login).*)", // protect everything under /admin except /admin/login
    "/admin/dashboard",
    "/admin/publish",
    "/admin/content-library",
    "/admin/content-library/comments",

    // Also match API routes
    "/api/(.*)",

    // Skip static files and Next internals
    "/((?!_next|.*\\..*).*)",
  ],
};
