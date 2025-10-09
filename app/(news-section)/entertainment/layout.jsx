/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Entertainment
export const metadata = buildMetadata(
  "entertainment",
  "Latest entertainment news, celebrity updates, movies, and music from Linkcon News."
);

export default async function EntertainmentLayout({ children }) {

  const { documents = [] } = await getArticles({
    section: "entertainment",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="entertainment-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "entertainment")),
        }}
      />
      {children}
    </>
  );
}
