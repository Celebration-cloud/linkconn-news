import { siteConfig } from "@/config/site";

export function buildNewsSchema(articles, category = "home") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: article.title,
        description: article.summary,
        articleBody: article.content || article.summary,
        keywords: article.tags?.join(", "),
        image: [article.image],
        datePublished: article.date,
        dateModified: article.updatedAt || article.date,
        author: {
          "@type": "Person",
          name: article.authorName,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: siteConfig.logo,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/${category}/${article.slug}`,
        },
      },
    })),
  };
}
