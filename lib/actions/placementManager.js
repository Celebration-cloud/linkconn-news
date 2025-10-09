/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";

const collectionId = "687bbd84001df808c851"; // same as API route
const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;

const placementRules = {
  "front-page": { max: 5, expiryHours: null },
  "breaking-news": { max: 10, expiryHours: 24 },
  "top-stories": { max: 15, expiryHours: null },
};

export async function enforcePlacement(article) {
  const { placement } = article;
  if (!placement || placement === "none") return article;

  const rules = placementRules[placement];
  if (!rules) return article;

  // Expiry
  if (rules.expiryHours) {
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - rules.expiryHours);

    // Find expired
    const expired = await databases.listDocuments(dbId, collectionId, [
      Query.equal("placement", placement),
      Query.lessThan("createdAt", cutoff.toISOString()),
    ]);

    // Bump expired to none
    for (const doc of expired.documents) {
      await databases.updateDocument(dbId, collectionId, doc.$id, {
        placement: "none",
      });
    }
  }

  // Active count
  const active = await databases.listDocuments(dbId, collectionId, [
    Query.equal("placement", placement),
    Query.orderAsc("createdAt"),
  ]);

  if (active.total >= rules.max) {
    // bump oldest
    const toBump = active.documents[0];
    await databases.updateDocument(dbId, collectionId, toBump.$id, {
      placement: "none",
    });
  }

  return article;
}
