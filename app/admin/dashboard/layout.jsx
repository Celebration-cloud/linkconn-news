import { siteConfig } from "@/config/site";
import { NextThemesProvider } from "next-themes";

export default function Layout({ children }) {
    
    return (
        <section>
            {children}
        </section>
    );
}
