/* eslint-disable react/react-in-jsx-scope */
// app/admin/publish/page.tsx
import DashboardCreate from "@/components/dashboard/dashboard-create";

export const metadata = {
  title: "Publish Article",
  description: "Edit or create an article",
};

export default function PublishPage() {

  return (
    <div className="mb-10">
      <DashboardCreate />
    </div>
  );
}
