/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { AdSlot } from "@/components/advertisement/AdSlot";
import { Card, CardBody } from "@heroui/react";
import parse from "html-react-parser";

export function ArticleContent({
  article,
  insertAds = [2, 10],
  insertReadAlso = 15,
}) {
  // Split paragraphs
  const paragraphs = article.content.split(/<\/p>/i);

  return (
    <div className="flex gap-6">
      {/* Main Article */}
      <Card className="flex-1 shadow-none dark:bg-gray-900 dark:border dark:border-gray-700">
        <CardBody className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
          <p className="text-xl font-medium">{article.summary}</p>

          {paragraphs.map((chunk, index) => (
            <div key={index}>
              {/* Render paragraph if not empty */}
              {chunk.trim() && parse(chunk + "</p>")}

              {/* Inject Ads dynamically */}
              {insertAds.includes(index) && (
                <div className="my-8">
                  <AdSlot type="inline" />
                </div>
              )}

              {/* Inject READ ALSO dynamically */}
              {index === insertReadAlso && (
                <div className="my-10 px-6 py-8 bg-blue-50 dark:bg-blue-900/40 rounded-xl border-l-4 border-blue-600 dark:border-blue-400">
                  <a
                    href="/article/security-operatives-dislodge-ipob-commanders"
                    className="block text-2xl font-bold text-blue-700 dark:text-blue-400 leading-snug hover:underline"
                  >
                    READ ALSO: Security operatives dislodge ‘notorious IPOB
                    commanders’ from hideouts
                  </a>
                </div>
              )}
            </div>
          ))}
        </CardBody>
      </Card>

      {/* 🔥 Side Ad (sticky) */}
      <aside className="hidden lg:block w-72">
        <div className="sticky top-20">
          <AdSlot type="side" />
        </div>
      </aside>
    </div>
  );
}
