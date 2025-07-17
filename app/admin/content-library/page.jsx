import { ArticleTable } from "@/components/dashboard/ArticleTable";
import ArticleTabsLayout from "@/components/dashboard/ArticleTabsLayout";
import { SpinnerLoading } from "@/components/spinner-loading";
import { Suspense } from "react";

export const metadata = {
  title: "Article Management",
  description: "Manage your articles here",
};

export default function ContentLibraryPage({children}) {
 return (
   <ArticleTabsLayout>
     <Suspense fallback={<SpinnerLoading />}>
       <div>
         <h1 className="text-2xl font-bold mb-4">Content Library</h1>
         <p className=" mb-6 ">
           Manage your articles, drafts, and published content.
         </p>
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
           <ArticleTable />
         </div>
       </div>
     </Suspense>
   </ArticleTabsLayout>
 );
}