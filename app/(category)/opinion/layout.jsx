// app/(sections)/opinion/layout.js

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Opinion section
export const metadata = buildMetadata(
  "opinion",
  "Editorials, commentaries, and viewpoints from Linkcon News."
);

export default async function OpinionLayout({ children }) {

  // Fetch opinion articles from DB
  const { documents = [] } = await getArticles({
    category: "opinion",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      {/* JSON-LD Schema for Opinion news */}
      <Script
        id="opinion-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "opinion")),
        }}
      />
      {children}
    </>
  );
}
