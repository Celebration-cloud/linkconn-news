/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import parse from "html-react-parser";

export function ArticleContent({ article }) {
  if (!article?.content) return null;

  return (
    <div className="space-y-6 text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
      {parse(article.content)}
    </div>
  );
}
