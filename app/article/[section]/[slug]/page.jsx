/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// app/article/[slug]/page.jsx
// app/article/[section]/[slug]/page.jsx
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getRelatedByCategory,
} from "@/lib/actions/getArticles";
import Article from "./_components/Article";
import { ArticleMetaProvider } from "@/context/ArticleMetaProvider";

export const revalidate = 0; // ISR every hour

export default async function ArticlePage({ params }) {
  // ✅ Await params before destructuring
  const { slug, section } = await params;

  if (!slug) return notFound();

  const article = await getArticleBySlug(slug);
  console.log("Fetched article:", article)
  if (!article) return notFound();

  const related = getRelatedByCategory
    ? await getRelatedByCategory(article.newsSection || section === "top-news" && "top-stories", article.slug, 4)
    : [];

  return (
    <ArticleMetaProvider slug={article.slug} content={article.content} article={article}>
      <div className="space-y-4">
        <Article related={related} />
      </div>
    </ArticleMetaProvider>
  );
}
