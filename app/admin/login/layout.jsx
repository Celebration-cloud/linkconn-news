import { DashboardLoginNav } from "@/components/dashboard/DashboardLoginNav";

export default function LoginLayout({ children }) {
  return (
    <section className="flex flex-col justify-between items-center gap-4 w-full min-h-screen bg-background text-foreground">
      <DashboardLoginNav />
      {children}
    </section>
  );
}
