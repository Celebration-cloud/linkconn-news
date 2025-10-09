/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Culture
export const metadata = buildMetadata(
  "culture",
  "Arts, entertainment, and cultural stories from Linkcon News."
);

export default async function CultureLayout({
  children
}) {

  const { documents = [] } = await getArticles({
    category: "culture",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="culture-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "culture")),
        }}
      />
      {children}
    </>
  );
}
