// app/(sections)/weather/layout.js

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { buildNewsSchema } from "@/lib/buildSchema";
import { buildMetadata } from "@/lib/buildMetadata";
import Script from "next/script";
import { getArticles } from "@/lib/actions/getArticles";

export const revalidate = 300;

// ✅ Static metadata for the section
export const metadata = buildMetadata(
  "weather",
  "Get the latest weather updates, forecasts, and alerts from Linkcon News."
);

export default async function WeatherLayout({ children, searchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { documents = [] } = await getArticles({
    category: "weather",
    limit,
    offset,
  });

  return (
    <>
      <Script
        id="weather-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNewsSchema(documents, "weather")),
        }}
      />
      {children}
    </>
  );
}
