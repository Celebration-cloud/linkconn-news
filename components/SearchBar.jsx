/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect, useRef } from "react";
import { Input, Kbd, Spinner } from "@heroui/react";
import { SearchIcon } from "@/components/icons";
import { getArticles } from "@/lib/actions/getArticles";
import Link from "next/link";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.trim().length > 1) {
        setLoading(true);
        const data = await getArticles({ search });
        const docs = data.documents || [];
        setResults(docs);
        setNoResult(docs.length === 0);
        setLoading(false);
      } else {
        setResults([]);
        setNoResult(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleResultClick = () => {
    setSearch("");
    setResults([]);
    setNoResult(false);
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        ref={inputRef}
        aria-label="Search news"
        placeholder="Search Linkcon News..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<SearchIcon className="text-default-400" />}
        endContent={
          loading ? (
            <Spinner size="sm" />
          ) : (
            <Kbd className="hidden lg:inline-block" keys={["⌘", "K"]} />
          )
        }
        classNames={{
          inputWrapper: "bg-default-100 w-full",
          input: "text-sm",
        }}
      />

      {(results.length > 0 || noResult) && (
        <ul className="absolute bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg mt-2 w-full shadow-lg max-h-60 overflow-y-auto z-50">
          {results.map((r) => (
            <li key={r.$id}>
              <Link
                href={`/article/${r.newsSection}/${r.slug}`}
                className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
                onClick={handleResultClick}
              >
                {r.title}
              </Link>
            </li>
          ))}

          {noResult && (
            <li className="px-4 py-2 text-neutral-500 text-sm">
              No articles found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
