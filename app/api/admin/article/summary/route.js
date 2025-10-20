/* eslint-disable no-undef */
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

// Database and Collection IDs from environment variables
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SAVES_ID;

/**
 * @route GET /api/admin/articles/summary
 * @description
 * Fetch comprehensive analytics summary for all articles in Appwrite.
 * Returns global metrics, performance stats, author/category/device insights,
 * and time-based trends for dashboards.
 *
 * @returns {object} JSON summary of article analytics
 */
export async function GET() {
  try {
    // 1. Fetch all articles (limit 1000 to prevent overload)
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(1000),
    ]);

    const articles = response.documents || [];

    // Early return if no articles exist
    if (articles.length === 0) {
      return Response.json({
        totals: {
          total: 0,
          published: 0,
          pending: 0,
          featured: 0,
          regular: 0,
        },
        metrics: {},
        insights: {},
        message: "No articles found.",
      });
    }

    // 2. Basic counts
    const total = articles.length;
    const published = articles.filter((a) => a.status === "published").length;
    const pending = articles.filter((a) => a.status === "Draft").length;
    const featured = articles.filter((a) => a.isFeatured).length;
    const regular = total - featured;

    // 3. Engagement totals
    const totalViews = articles.reduce(
      (sum, a) => sum + (a.impressions || 0),
      0
    );
    const totalClicks = articles.reduce((sum, a) => sum + (a.clicks || 0), 0);
    const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
    const totalShares = articles.reduce((sum, a) => sum + (a.shares || 0), 0);
    const totalComments = articles.reduce(
      (sum, a) => sum + (a.comments || 0),
      0
    );

    // 4. Calculated performance metrics
    const ctr = totalViews ? (totalClicks / totalViews) * 100 : 0; // Click-through rate (%)
    const engagementRate = totalViews
      ? ((totalLikes + totalShares + totalComments) / totalViews) * 100
      : 0;
    const avgReadDuration =
      articles.reduce((sum, a) => sum + (a.avgReadDuration || 0), 0) / total;
    const avgCompletionRate =
      articles.reduce((sum, a) => sum + (a.completionRate || 0), 0) / total;

    // 5. Author performance
    const authorStats = {};
    for (const a of articles) {
      if (!authorStats[a.authorName]) {
        authorStats[a.authorName] = {
          name: a.authorName,
          totalViews: 0,
          totalLikes: 0,
          totalArticles: 0,
        };
      }
      authorStats[a.authorName].totalViews += a.impressions || 0;
      authorStats[a.authorName].totalLikes += a.likes || 0;
      authorStats[a.authorName].totalArticles++;
    }
    const topAuthors = Object.values(authorStats)
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 5);

    // 6. Category breakdown
    const categoryCount = {};
    for (const a of articles) {
      const category = a.category || "Uncategorized";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    }
    const categoryStats = Object.entries(categoryCount).map(
      ([name, count]) => ({ name, count })
    );

    // 7. Device usage
    const deviceStats = {};
    for (const a of articles) {
      const device = a.topDeviceType || "Unknown";
      deviceStats[device] = (deviceStats[device] || 0) + 1;
    }
    const topDevices = Object.entries(deviceStats).map(([device, count]) => ({
      device,
      count,
    }));

    // 8. Monthly publishing trend
    const perMonthMap = {};
    for (const a of articles) {
      const date = new Date(a.$createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      perMonthMap[month] = (perMonthMap[month] || 0) + 1;
    }
    const articlesPerMonth = Object.entries(perMonthMap).map(
      ([month, count]) => ({
        month,
        count,
      })
    );

    // 9. Top performing articles
    const topArticles = [...articles]
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 5)
      .map((a) => ({
        title: a.title,
        views: a.impressions || 0,
        likes: a.likes || 0,
        shares: a.shares || 0,
        category: a.category,
        author: a.authorName,
      }));

    // 10. Structured response
    return Response.json({
      totals: {
        total,
        published,
        pending,
        featured,
        regular,
      },
      metrics: {
        totalViews,
        totalClicks,
        totalLikes,
        totalShares,
        totalComments,
        ctr: Number(ctr.toFixed(2)),
        engagementRate: Number(engagementRate.toFixed(2)),
        avgReadDuration: Number(avgReadDuration.toFixed(1)),
        avgCompletionRate: Number(avgCompletionRate.toFixed(1)),
      },
      insights: {
        topAuthors,
        categoryStats,
        topDevices,
        topArticles,
        articlesPerMonth,
      },
    });
  } catch (error) {
    console.error("Error fetching article stats:", error);
    return Response.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
