// app/(sections)/technology/layout.js

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Technology section
export const metadata = buildMetadata(
  "technology",
  "Latest updates on technology, gadgets, AI, and innovation from Linkcon News."
);

export default async function TechnologyLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch technology articles from DB
  const { documents = [] } = await getArticles({
    section: "technology",
    limit,
    offset,
  });

  return (
    <>
      {/* JSON-LD Schema for Technology news */}
      <Script
        id="technology-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "technology")),
        }}
      />
      {children}
    </>
  );
}
