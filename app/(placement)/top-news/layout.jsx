/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

export const metadata = buildMetadata(
   "top-news",
  "Stay updated with the latest top news from Linkcon News."
);

export default async function TopNewsLayout({ children }) {

  const { documents = [] } = await getArticles({
    placement: "top-stories",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="top-news-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "top-news")),
        }}
      />
      {children}
    </>
  );
}
