// app/(sections)/sport/layout.js

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Sport section
export const metadata = buildMetadata(
  "sport",
  "Latest sports news, scores, and highlights from Nigeria and around the world on Linkcon News."
);

export default async function SportLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // Fetch sport articles from DB
  const { documents = [] } = await getArticles({
    section: "sports",
    limit,
    offset,
  });

  return (
    <>
      {/* JSON-LD Schema for Sport news */}
      <Script
        id="sport-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "sport")),
        }}
      />
      {children}
    </>
  );
}
