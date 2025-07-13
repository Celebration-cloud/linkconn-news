"use client";

import { Tab, Tabs } from "@heroui/react";

export default function ArticleTabsLayout({ children }) {
  return (
    <Tabs
      aria-label="Options"
      variant="underlined"
      size="lg"
      color="primary"
      className="border-b-1 w-full border-blue-500"
      classNames={{
        tabList: "border-none p-0", // Removes HeroUI default border
        tab: "text-gray-600 dark:text-gray-300 data-[selected=true]:text-primary font-medium px-4 py-2 border-b-4 border-blue-500",
        cursor: "hidden", // Hides the default animated underline cursor
        tabPanel: "pt-6",
      }}
    >
      <Tab key="article" title="Article">
        {children}
      </Tab>
    </Tabs>
  );
}
