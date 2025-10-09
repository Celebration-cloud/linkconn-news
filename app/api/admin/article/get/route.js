/* eslint-disable no-undef */
// pages/api/admin/article/get.js (or app/api/.../get/route.js)

import { databases } from "@/lib/appwrite";
import { getAuth } from "@clerk/nextjs/server";
import { Query } from "appwrite";

const collectionId = "687bbd84001df808c851";
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function GET(req) {
  try {
    // Safe auth check
    const auth = getAuth(req);
    const userId = auth?.userId;
    console.log(auth.sessionId, auth.isAuthenticated, auth.userId);

    if (!userId) {
      // Return structured response instead of throwing
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
          code: "unauthorized",
        },
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const first = parseInt(searchParams.get("first") || "0");
    const rows = parseInt(searchParams.get("rows") || "10");
    const sortField = searchParams.get("sortField");
    const sortOrder = parseInt(searchParams.get("sortOrder") || "1"); // 1 asc, -1 desc
    const filters = JSON.parse(searchParams.get("filters") || "{}");

    // base queries (limit results to this user)
    let queries = [Query.equal("authorId", userId)];

    // filtering
    for (const field in filters) {
      const { value, matchMode } = filters[field] || {};
      if (!value) continue;

      if (field === "global") {
        const searchFields = ["title"]; // later you can add more fields here
        const orQueries = searchFields.map((f) => Query.search(f, value));

        if (orQueries.length > 1) {
          queries.push(Query.or(orQueries));
        } else if (orQueries.length === 1) {
          queries.push(orQueries[0]); // use single query directly
        }
        continue;
      }

      if (matchMode?.startsWith("custom_")) {
        // Handle custom filters
        switch (matchMode) {
          case "custom_$createdAt": {
            const [from, to] = value;
            if (from)
              queries.push(
                Query.greaterThanEqual(
                  "$createdAt",
                  new Date(from).toISOString()
                )
              );
            if (to)
              queries.push(
                Query.lessThanEqual("$createdAt", new Date(to).toISOString())
              );
            break;
          }

          case "custom_impressions":
          case "custom_clicks":
          case "custom_shares": {
            const [min, max] = value;
            if (min != null)
              queries.push(Query.greaterThanEqual(field, Number(min)));
            if (max != null)
              queries.push(Query.lessThanEqual(field, Number(max)));
            break;
          }

          default:
            break;
        }
      } else {
        // Normal filters
        if (["newsSection", "status", "category"].includes(field)) {
          queries.push(Query.equal(field, value));
        } else if (matchMode === "contains") {
          queries.push(Query.search(field, value));
        } else {
          queries.push(Query.equal(field, value));
        }
      }
    }

    // sorting
    if (sortField) {
      queries.push(
        sortOrder === -1
          ? Query.orderDesc(sortField)
          : Query.orderAsc(sortField)
      );
    } else {
      queries.push(Query.orderDesc("$createdAt")); // default sort
    }

    // pagination
    queries.push(Query.limit(rows));
    queries.push(Query.offset(first));

    const articles = await databases.listDocuments(dbId, collectionId, queries);

    return Response.json({
      success: true,
      data: articles.documents,
      totalRecords: articles.total,
    });
  } catch (error) {
    console.error("❌ Failed to fetch articles:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
