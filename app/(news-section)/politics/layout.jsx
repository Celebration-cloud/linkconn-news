// app/(sections)/politics/layout.js

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Politics section
export const metadata = buildMetadata(
  "politics",
  "Latest political news and analysis from Linkcon News."
);

export default async function PoliticsLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch politics articles from DB
  const { documents = [] } = await getArticles({
    section: "politics",
    limit,
    offset,
  });

  return (
    <>
      {/* JSON-LD Schema for Politics news */}
      <Script
        id="politics-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "politics")),
        }}
      />
      {children}
    </>
  );
}
