/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Metadata for Education
export const metadata = buildMetadata(
  "education",
  "Latest education news, policies, schools, and academic insights from Linkcon News."
);

export default async function EducationLayout({ children }) {

  const { documents = [] } = await getArticles({
    section: "education",
    limit: 10,
    offset: 0,
  });

  return (
    <>
      <Script
        id="education-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "education")),
        }}
      />
      {children}
    </>
  );
}
