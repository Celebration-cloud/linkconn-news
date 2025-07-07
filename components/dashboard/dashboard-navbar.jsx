"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Image,
} from "@heroui/react";
import { ThemeSwitch } from "../theme-switch";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
// Define routes where Navbar should be hidden
const hiddenNavbarRoutes = [
  "/auth",
  "/login",
  "/onboarding",
  "/admin/login",
];

export default function DashboardNavbar() {
  const { toggleSidebar } = useSidebar();

    const pathname = usePathname();
    const hideNavbar = hiddenNavbarRoutes.includes(pathname);
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
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
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
