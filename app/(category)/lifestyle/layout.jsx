/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Lifestyle
export const metadata = buildMetadata(
  "lifestyle",
  "Lifestyle news and trends, covering fashion, health, travel, and everyday living from Linkcon News."
);

export default async function LifestyleLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [] } = await getArticles({
    category: "lifestyle",
    limit,
    offset,
  });

  return (
    <>
      <Script
        id="lifestyle-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "lifestyle")),
        }}
      />
      {children}
    </>
  );
}
