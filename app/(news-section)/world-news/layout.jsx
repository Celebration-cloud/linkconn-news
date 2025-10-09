// app/(sections)/world-news/layout.js

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Static metadata for the section
export const metadata = buildMetadata(
  "world-news",
  "Get the latest global updates, international affairs, and breaking world news from Linkcon News."
);

export default async function WorldNewsLayout({ children }) {

  const { documents = [] } = await getArticles({
    section: "world",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="world-news-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "world-news")),
        }}
      />
      {children}
    </>
  );
}
