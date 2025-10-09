/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Health
export const metadata = buildMetadata(
  "health",
  "Health news, medical research, fitness, and wellness updates from Linkcon News."
);

export default async function HealthLayout({ children }) {

  const { documents = [] } = await getArticles({
    section: "health",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="health-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "health")),
        }}
      />
      {children}
    </>
  );
}
