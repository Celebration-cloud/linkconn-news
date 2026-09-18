/* eslint-disable react/react-in-jsx-scope */
export const siteConfig = {
  name: "Linkcon News",
  description:
    "Linkcon News delivers trusted, fast, and insightful coverage across Nigeria and the world.",
  url: "https://linkconnews.com", // replace with your real domain
  logo: "/favicon.ico",
  covers: [
  {
    title: "Politics",
    desc: "National Assembly to grassroots movements shaping Nigeria.",
    icon: "megaphone",
  },
  {
    title: "Business",
    desc: "Markets, startups, and economic innovation.",
    icon: "briefcase",
  },
  {
    title: "Health",
    desc: "Wellness, research, and public health news.",
    icon: "heart",
  },
  {
    title: "Entertainment",
    desc: "Culture, film, music, and creative trends.",
    icon: "video",
  },
  {
    title: "Technology",
    desc: "Emerging tech, AI, and digital economy insights.",
    icon: "microchip-ai",
  },
  {
    title: "Opinion",
    desc: "Analysis and perspective pieces challenging thinking.",
    icon: "comments",
  },
],
  team: [
    {
      name: "Amara Johnson",
      role: "Editor-in-Chief",
      desc: "Leads editorial direction and upholds Linkcon’s journalistic standards.",
    },
    {
      name: "David Okoye",
      role: "Political Correspondent",
      desc: "Covers politics, governance, and accountability across Nigeria.",
    },
    {
      name: "Fatima Ahmed",
      role: "Health & Science Reporter",
      desc: "Focuses on medical research, innovation, and wellness stories.",
    },
    {
      name: "Samuel Adeyemi",
      role: "Business Analyst",
      desc: "Breaks down market trends and startup developments in Africa.",
    },
    {
      name: "Chika Nwosu",
      role: "Entertainment Editor",
      desc: "Leads coverage of film, culture, and creative industry news.",
    },
    {
      name: "Grace Olamide",
      role: "Digital Lead",
      desc: "Manages audience engagement and digital content distribution.",
    },
  ],
  missionVision: [
    {
      title: "Our Mission",
      color: "text-royalblue-600 dark:text-royalblue-400",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
          <li>
            Deliver reliable, fast, and factual news across Nigeria and beyond.
          </li>
          <li>
            Bridge traditional reporting with modern digital storytelling.
          </li>
          <li>Empower readers with clarity, depth, and verified context.</li>
        </ul>
      ),
      bg: "bg-gradient-to-tl from-royalblue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900",
    },
    {
      title: "Our Vision",
      color: "text-cyan-700 dark:text-cyan-400",
      content: (
        <p className="text-gray-800 dark:text-gray-200">
          To redefine African journalism for the digital age, setting a new
          standard in integrity, accessibility, and audience engagement.
        </p>
      ),
      bg: "bg-gradient-to-tl from-cyan-50 to-royalblue-50 dark:from-gray-800 dark:to-gray-900",
    },
  ],
  topLinks: [
    { key: "features", label: "Features", href: "/features" },
    { key: "investigations", label: "Investigations", href: "/investigations" },
    { key: "opinion", label: "Opinion", href: "/opinion" },
    { key: "lifestyle", label: "Lifestyle", href: "/lifestyle" },
    { key: "culture", label: "Culture", href: "/culture" },
    { key: "weather", label: "Weather", href: "/weather" },
  ],
  navItems: [
    {
      label: "Top News",
      href: "/top-news",
    },
    {
      label: "World News",
      href: "/world-news",
    },
    {
      label: "Politics",
      href: "/politics",
    },
    {
      label: "Business",
      href: "/business",
    },
    {
      label: "Technology",
      href: "/technology",
    },
    {
      label: "Health",
      href: "/health",
    },
    {
      label: "Sports",
      href: "/sports",
    },
    {
      label: "Entertainment",
      href: "/entertainment",
    },
    {
      label: "Education",
      href: "/education",
    },
    {
      label: "Opinion",
      href: "/opinion",
    },
  ],
  categories: [
    { key: "news", label: "News" },
    { key: "features", label: "Features" },
    { key: "investigations", label: "Investigations" },
    { key: "opinion", label: "Opinion" },
    { key: "lifestyle", label: "Lifestyle" },
    { key: "culture", label: "Culture" },
    { key: "weather", label: "Weather" },
  ],

  newsSections: [
    "World",
    "Politics",
    "Business",
    "Technology",
    "Health",
    "Sports",
    "Entertainment",
    "Education",
  ],

  // Placement definitions
  placements: [
    { key: "front-page", label: "Front Page" },
    { key: "breaking-news", label: "Breaking News" },
    { key: "top-stories", label: "Top Stories" },
    { key: "trending", label: "Trending" },
    { key: "none", label: "None" },
  ],

  links: {
    github: "https://github.com/linkcon-news",
    twitter: "https://twitter.com/linkcon_news",
    docs: "https://linkcon.news/docs",
    discord: "https://discord.gg/linkcon",
  },
};
