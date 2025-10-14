/* eslint-disable no-undef */
import { NextResponse } from "next/server";
import { Query } from "appwrite";
import { databases } from "@/lib/appwrite";

const dbId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const readsCollection = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_READS_ID;
const articlesCollection = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SAVES_ID;

export async function POST(req) {
  try {
    const {
      articleId,
      userId = "guest",
      readDuration,
      deviceType,
      readLocation,
      completed = false,
    } = await req.json();

    if (!articleId || !readDuration) {
      return NextResponse.json(
        { success: false, error: "Missing articleId or readDuration" },
        { status: 400 }
      );
    }

    // 1. Check if record already exists for this article + user
    const existing = await databases.listDocuments(dbId, readsCollection, [
      Query.equal("articleId", articleId),
      Query.equal("userId", userId),
    ]);

    let updatedDuration = Number(readDuration);

    if (existing.total > 0) {
      const doc = existing.documents[0];
      updatedDuration = (doc.readDuration || 0) + Number(readDuration);

      await databases.updateDocument(dbId, readsCollection, doc.$id, {
        readDuration: updatedDuration,
        completed,
        deviceType: deviceType || doc.deviceType || null,
        readLocation: readLocation || doc.readLocation || null,
      });
    } else {
      await databases.createDocument(dbId, readsCollection, "unique()", {
        articleId,
        userId,
        readDuration: updatedDuration,
        completed,
        deviceType: deviceType || null,
        readLocation: readLocation || null,
      });
    }

    // 2. Fetch all reads for this article
    const allReads = await databases.listDocuments(dbId, readsCollection, [
      Query.equal("articleId", articleId),
      Query.limit(1000),
    ]);

    // 3. Calculate analytics
    const totalReads = allReads.total;
    const uniqueReaders = new Set(allReads.documents.map((d) => d.userId)).size;
    const totalDuration = allReads.documents.reduce(
      (sum, d) => sum + (Number(d.readDuration) || 0),
      0
    );
    const avgReadDuration = totalReads > 0 ? totalDuration / totalReads : 0;
    const completedReads = allReads.documents.filter((d) => d.completed).length;
    const completionRate =
      totalReads > 0 ? (completedReads / totalReads) * 100 : 0;

    // 4. Top device type
    const deviceCounts = allReads.documents.reduce((acc, d) => {
      const dt = d.deviceType ? String(d.deviceType).toLowerCase() : null;
      if (!dt) return acc;
      acc[dt] = (acc[dt] || 0) + 1;
      return acc;
    }, {});

    let topDeviceType = "unknown";
    let maxCount = 0;
    for (const [dt, cnt] of Object.entries(deviceCounts)) {
      if (cnt > maxCount) {
        maxCount = cnt;
        topDeviceType = dt;
      }
    }

    if (!["mobile", "tablet", "desktop"].includes(topDeviceType)) {
      topDeviceType = "unknown";
    }

    // 5. Update analytics directly in the article document
    await databases.updateDocument(dbId, articlesCollection, articleId, {
      totalReads,
      uniqueReaders,
      avgReadDuration: Number(avgReadDuration.toFixed(2)),
      completionRate: Number(completionRate.toFixed(2)),
      topDeviceType,
    });

    // 6. Return analytics data
    return NextResponse.json({
      success: true,
      articleId,
      totalReads,
      uniqueReaders,
      avgReadDuration: Number(avgReadDuration.toFixed(2)),
      completionRate: Number(completionRate.toFixed(2)),
      topDeviceType,
    });
  } catch (error) {
    console.error("Error saving article read:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save read" },
      { status: 500 }
    );
  }
}
