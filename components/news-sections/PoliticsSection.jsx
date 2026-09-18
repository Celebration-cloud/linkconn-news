/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import SectionHeader from "./SectionHeader";
import EditorialCard from "../shared/news-layout/EditorialCard";

export default function PoliticsSection({ articles = [] }) {
  if (!articles.length) return null;

  const lead = articles[0];
  const side = articles.slice(1, 4);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Politics & Policy"
        link="/politics"
        ctaLabel="Explore politics"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {lead && (
          <div className="lg:col-span-7">
            <EditorialCard article={lead} variant="featured" />
          </div>
        )}

        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {side.map((art) => (
            <EditorialCard key={art.$id || art.id || art.slug} article={art} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
