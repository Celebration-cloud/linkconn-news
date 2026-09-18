/* eslint-disable react/prop-types */
import React from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  CloudSun,
  Clapperboard,
  Cpu,
  Dumbbell,
  Earth,
  GraduationCap,
  HeartPulse,
  Landmark,
  LibraryBig,
  MessageSquareQuote,
  Newspaper,
  Palette,
  SearchCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const CATEGORY_THEMES = {
  news: { label: "News", icon: Newspaper },
  "top-news": { label: "Top News", icon: Sparkles },
  "world-news": { label: "World News", icon: Earth },
  politics: { label: "Politics", icon: Landmark },
  business: { label: "Business", icon: BriefcaseBusiness },
  technology: { label: "Technology", icon: Cpu },
  health: { label: "Health", icon: HeartPulse },
  sports: { label: "Sports", icon: Dumbbell },
  entertainment: { label: "Entertainment", icon: Clapperboard },
  education: { label: "Education", icon: GraduationCap },
  opinion: { label: "Opinion", icon: MessageSquareQuote },
  features: { label: "Features", icon: LibraryBig },
  investigations: { label: "Investigations", icon: SearchCheck },
  lifestyle: { label: "Lifestyle", icon: HeartPulse },
  culture: { label: "Culture", icon: Palette },
  weather: { label: "Weather", icon: CloudSun },
  latest: { label: "Latest", icon: Clock3 },
  trending: { label: "Trending", icon: TrendingUp },
  editorials: { label: "Editorials", icon: BookOpen },
};

const CATEGORY_ALIASES = {
  world: "world-news",
  top: "top-news",
  "top stories": "top-news",
  sport: "sports",
  tech: "technology",
  feature: "features",
  investigation: "investigations",
  editorial: "editorials",
};

export function normalizeCategory(value = "news") {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const aliased = CATEGORY_ALIASES[normalized] || normalized;
  return CATEGORY_THEMES[aliased] ? aliased : "news";
}

export function getCategoryTheme(value) {
  const key = normalizeCategory(value);
  return { key, ...CATEGORY_THEMES[key] };
}

export function CategoryIcon({ category, ...props }) {
  const { icon: Icon } = getCategoryTheme(category);
  return <Icon aria-hidden="true" strokeWidth={1.8} {...props} />;
}
