/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Features
export const metadata = buildMetadata(
  "features",
  "In-depth features, human interest stories, and special reports from Linkcon News."
);

export default async function FeaturesLayout({ children }) {

  const { documents = [] } = await getArticles({
    category: "features",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="features-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "features")),
        }}
      />
      {children}
    </>
  );
}
