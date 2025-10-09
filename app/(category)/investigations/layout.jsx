/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Investigations
export const metadata = buildMetadata(
  "investigations",
  "Investigative reports and in-depth journalism from Linkcon News."
);

export default async function InvestigationsLayout({ children }) {

  const { documents = [] } = await getArticles({
    category: "investigations",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="investigations-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "investigations")),
        }}
      />
      {children}
    </>
  );
}
