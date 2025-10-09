/* eslint-disable react/react-in-jsx-scope */
// import ArticleTable from "@/components/dashboard/ArticleTable/ArticleTable";
import ArticleTable2 from "@/components/dashboard/ArticleTable2";
// import ArticleTabsLayout from "@/components/dashboard/ArticleTabsLayout";
import { ArticleProvider } from "@/context/ArticleProvider";

export const metadata = {
  title: "Article Management",
  description: "Manage your articles here",
};

export default function ContentLibraryPage() {
 return (
   <ArticleProvider>
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">

           {/* <ArticleTable /> */}
           <ArticleTable2 />
         </div>
   </ArticleProvider>
 );
}

export const revalidate = 0; // Disable caching for dynamic content