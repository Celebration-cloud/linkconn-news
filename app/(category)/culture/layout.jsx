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

export default async function CultureLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [] } = await getArticles({
    category: "culture",
    limit,
    offset,
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
