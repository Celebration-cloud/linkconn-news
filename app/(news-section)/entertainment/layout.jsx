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

export default async function EntertainmentLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [] } = await getArticles({
    section: "entertainment",
    limit,
    offset,
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
