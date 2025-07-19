"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  Badge,
  Image,
  addToast,
} from "@heroui/react";
import { ThemeSwitch } from "../theme-switch";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";
import { useUser, UserButton, SignedIn } from "@clerk/nextjs";

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

// Routes where navbar is hidden
const hiddenNavbarRoutes = ["/auth", "/login", "/onboarding", "/admin/login"];

export default function DashboardNavbar() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { isLoaded } = useUser();

  const hideNavbar = hiddenNavbarRoutes.includes(pathname);

  // Prevent rendering until Clerk finishes loading
  if (!isLoaded) return null;

  return (
    !hideNavbar && (
      <Navbar
        maxWidth="full"
        as="nav"
        className="bg-background text-foreground shadow-md"
      >
        <NavbarContent as="div" className="flex float-start" justify="start">
          <i
            className="pi pi-align-left text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
          <NavbarBrand>
            <Link href="/admin">
              <Image src="/favicon.ico" width={125} height={40} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <div className="flex gap-4 items-center">
            <NavbarItem>
              <Badge children="5" color="primary" variant="solid" content="3">
                <i className="pi pi-comment text-4xl" />
              </Badge>
            </NavbarItem>

            <Dropdown placement="bottom-end">
              <SignedIn>
                <UserButton afterSignOutUrl="/admin/login" />
              </SignedIn>
            </Dropdown>

            <NavbarItem>
              <ThemeSwitch />
            </NavbarItem>
          </div>
        </NavbarContent>
      </Navbar>
    )
  );
}
