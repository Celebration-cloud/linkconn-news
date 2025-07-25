import { SpinnerLoading } from "@/components/spinner-loading";
import { Suspense } from "react";

export const metadata = {
  title: "Article Management",
  description: "Manage your articles here",
};

export default function Layout({ children }) {
  return (
    <main className="min-h-screen px-4 py-8">
      <Suspense fallback={<SpinnerLoading />}>
        <section className="mx-auto max-w-5xl p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
          {children}
        </section>
      </Suspense>
    </main>
  );
}
