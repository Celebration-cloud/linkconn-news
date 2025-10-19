/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useReadingTracker } from "@/hooks/useReadingTracker";
import {
  fetchArticleByIdThunk,
  updateArticleThunk,
} from "@/store/articleSlice";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

const ArticleMetaContext = createContext(null);

export function ArticleMetaProvider({ article, slug, content, children, user }) {
  const dispatch = useDispatch();
  const articleRef = useRef(null);
    const { profile } = useSelector((state) => state.auth);
      if (profile && profile.userId) {
        user.id = profile.userId;
        user.name = profile.name;
        user.avatar = profile.cover;
      }
    console.log(
      "User profile in ArticleMetaProvider:",
      profile,
      "Demo profile in ArticleMetaProvider:",
      user
    );

  const [visits, setVisits] = useState(article.clicks || 0);
  const [impression, setImpression] = useState(article.impressions || 0);
  const [shares, setShares] = useState(article.shares || 0);
  const [readingTime, setReadingTime] = useState(null);
  useReadingTracker(article, user.id || "guest");


  const {
    items: comments,
    loading,
    totalLikes,
    totalDislikes,
    totalComments,
  } = useSelector((s) => s.comments);

  // Count visit once per session
  useEffect(() => {
    if (!article?.$id) return;
    const key = `visited-${article.$id}`;
    if (!sessionStorage.getItem(key)) {
      setVisits((v) => v + 1);
      sessionStorage.setItem(key, "true");
    }
  }, [article?.$id]);

  // Count impression
  useEffect(() => {
    if (!articleRef.current) return;

    const target = articleRef.current;
    const triggerImpression = () => setImpression((prev) => prev + 1);

    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) triggerImpression();

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          triggerImpression();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [article?.$id]);

  // Reading time
  useEffect(() => {
    if (!content) return;
    const words = content.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));
  }, [slug, content]);

  // ✅ Handle share count
  const recordShare = useCallback(() => {
    setShares((prev) => prev + 1);
  }, []);

  // Sync metadata
  useEffect(() => {
    if (!article?.$id) return;

    dispatch(
      updateArticleThunk({
        id: article.$id,
        data: {
          ...article,
          comments: totalComments,
          likes: totalLikes,
          dislikes: totalDislikes,
          clicks: visits,
          impressions: impression,
          shares: shares,
        },
      })
    ).then(() => {
      dispatch(fetchArticleByIdThunk(article.$id));
    });
  }, [
    article?.$id,
    totalComments,
    totalLikes,
    totalDislikes,
    visits,
    impression,
    shares,
    dispatch,
  ]);

  return (
    <ArticleMetaContext.Provider
      value={{
        article,
        visits,
        impression,
        shares,
        readingTime,
        comments,
        totalComments,
        loading,
        user,
        dispatch,
        recordShare,
        articleRef,
      }}
    >
      {children}
    </ArticleMetaContext.Provider>
  );
}

export function useArticleMeta() {
  const ctx = useContext(ArticleMetaContext);
  if (!ctx)
    throw new Error("useArticleMeta must be used inside ArticleMetaProvider");
  return ctx;
}
