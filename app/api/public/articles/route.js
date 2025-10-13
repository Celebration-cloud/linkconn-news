/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

const collectionId = "687bbd84001df808c851";
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const section = searchParams.get("section");
    const placement = searchParams.get("placement");
    const search = searchParams.get("search"); // add search support

    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");
    const limit = limitParam ? parseInt(limitParam) : null;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    const filters = [Query.orderDesc("$createdAt")];

    if (category) filters.push(Query.equal("category", category));
    if (section) filters.push(Query.equal("newsSection", section));
    if (placement) filters.push(Query.equal("placement", placement));

    // Add search by title if user types in search bar
    if (search && search.trim() !== "") {
      filters.push(Query.search("title", search.trim())); // "contains" search
    }

    const articles = await databases.listDocuments(dbId, collectionId, filters);
    const total = articles.total;

    const paginatedArticles = {
      documents: limit
        ? articles.documents.slice(offset, offset + limit)
        : articles.documents.slice(offset),
      total,
      limit: limit || total,
      offset,
    };

    return Response.json({ success: true, data: paginatedArticles });
  } catch (error) {
    console.error("❌ Failed to fetch articles:", error);
    return Response.json(
      { success: false, error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
