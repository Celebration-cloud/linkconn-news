// app/publish/edit/[slug]/page.jsx

import DashboardCreate from "@/components/dashboard/dashboard-create";
// import { getData } from "@/lib/data"; // your data fetching function

export const metadata = {
  title: "Edit Article",
    description: "Edit your article here",
};

export default function EditPage({ params }) {
  return (
    <div className="mb-10">
      <DashboardCreate slug={params.slug} />
    </div>
  );
}
