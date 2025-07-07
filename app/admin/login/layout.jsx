import { DashboardLoginNav } from "@/components/dashboard/DashboardLoginNav";
import { siteConfig } from "@/config/site";

export default function Layout({ children }) {
    
    return (
      <section className="flex flex-col items-center gap-4 w-full">
        <DashboardLoginNav />
        {children}
      </section>
    );
}
