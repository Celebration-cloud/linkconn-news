/* eslint-disable react/react-in-jsx-scope */
// layout/LoginLayout.jsx

import { DashboardLoginNav } from "@/components/dashboard/DashboardLoginNav";
import { AuthUIProvider } from "@/context/AuthUIContext";

export default function LoginLayout({ children }) {
  
  return (
    <AuthUIProvider>
      <section className="flex flex-col justify-between items-center gap-4 w-full min-h-screen bg-background text-foreground">
        <DashboardLoginNav />
        {children}
      </section>
    </AuthUIProvider>
  );
}
