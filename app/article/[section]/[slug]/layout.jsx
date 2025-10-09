/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// app/article/[section]/[slug]/layout.jsx
import { getArticleBySlug, getArticles } from "@/lib/actions/getArticles";

export const revalidate = 3600; // every hour

// ✅ Prebuild only the latest 10 articles
export async function generateStaticParams() {
  try {
    const latest = await getArticles({ limit: 10, offset: 0 });

    if (!latest?.documents?.length) return [];

    return latest.documents.map((a) => ({
      section: a.category || a.newsSection || "general", // adjust based on your DB fields
      slug: a.slug,
    }));
  } catch (err) {
    console.error("generateStaticParams error:", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await params

  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found • Linkcon News",
      description: "The requested article could not be found.",
    };
  }

  const url = `https://www.linkconnews.com/article/${article.category}/${article.slug}`;
  const title = `${article.title} • Linkcon News`;
  const description = article.summary?.slice(0, 180) || "Read on Linkcon News.";
  const images = [
    { url: article.cover, width: 1200, height: 630, alt: article.title },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images,
      siteName: "Linkcon News",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.cover],
      site: "@linkconnews",
      creator: "@linkconnews",
    },
    other: {
      "article:author": article.authorName,
      "article:section": article.newsSection,
      "article:published_time": article.$createdAt,
      "article:modified_time": article.$updatedAt,
      "article:tag": article.tags?.join(","),
    },
  };
}

export default function ArticleLayout({ children }) {
  return <div className="min-h-screen">{children}</div>;
}
