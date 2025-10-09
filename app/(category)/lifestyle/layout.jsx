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

export default async function LifestyleLayout({ children }) {

  const { documents = [] } = await getArticles({
    category: "lifestyle",
    limit: 10,
    offset: 0,
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
