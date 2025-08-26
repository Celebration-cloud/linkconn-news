export const siteConfig = {
  name: "Linkcon News",
  description:
    "Linkcon News delivers trusted, fast, and insightful coverage across Nigeria and the world.",
  logo: "/favicon.ico",
  categories: [
    { key: "politics", label: "Politics" },
    { key: "health", label: "Health" },
    { key: "sports", label: "Sports" },
    { key: "tech", label: "Technology" },
  ],
  navItems: [
    {
      label: "Headlines",
      href: "/",
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
    {
      label: "World",
      href: "/world",
    },
  ],
  newsSections: [
    "Headlines",
    "Politics",
    "Business",
    "Technology",
    "Health",
    "Sports",
    "Entertainment",
    "Education",
    "Opinion",
    "World",
  ],

  dashboardSideBar: [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      path: "/admin/dashboard",
    },
    {
      label: "Create",
      icon: "pi pi-pencil",
      path: "/admin/publish",
    },
    {
      label: "Content Library",
      icon: "pi pi-book",
      path: "/admin/content-library",
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      path: "/admin/settings",
    },
    {
      separator: true,
    },
    {
      label: "Visit Site",
      icon: "pi pi-home",
      path: "/",
      external: true,
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Create Article",
      href: "/dashboard/create",
    },
    {
      label: "Manage Articles",
      href: "/dashboard/articles",
    },
    {
      label: "Categories",
      href: "/dashboard/categories",
    },
    {
      label: "Tags",
      href: "/dashboard/tags",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/linkcon-news",
    twitter: "https://twitter.com/linkcon_news",
    docs: "https://linkcon.news/docs",
    discord: "https://discord.gg/linkcon",
    sponsor: "https://patreon.com/linkconnews",
  },
};
