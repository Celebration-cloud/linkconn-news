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
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  addToast,
  Avatar,
} from "@heroui/react";
import { ThemeSwitch } from "../theme-switch";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";
import { useUser, useClerk, UserButton, SignedIn } from "@clerk/nextjs";
import { deletePublisher } from "@/lib/actions/publisher"; // make sure path is correct

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

const hiddenNavbarRoutes = ["/auth", "/login", "/onboarding", "/admin/login"];

export default function DashboardNavbar() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();

  const hideNavbar = hiddenNavbarRoutes.includes(pathname);
  if (!isLoaded) return null;


const handleAccountDelete = async () => {
  const confirmDelete = confirm(
    "Are you sure you want to permanently delete your account? This action cannot be undone."
  );
  if (!confirmDelete) return;

  try {
    // 1. Delete Appwrite publisher record using action
    await deletePublisher();

    // 2. Delete Clerk user
    await user.delete();

    addToast({
      title: "Your account has been deleted.",
      description: "Your account has been deleted successfully",
      color: "success",
    });

    router.push("/admin/login");
  } catch (err) {
    console.error(err);
    addToast({
      title: "Failed to delete account.",
      description:
        err.message || "Something went wrong while deleting account.",
      color: "warning",
    });
  }
};


  return (
    !hideNavbar && (
      <Navbar
        maxWidth="full"
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
              <Badge color="primary" variant="solid" content="3">
                <i className="pi pi-comment text-4xl" />
              </Badge>
            </NavbarItem>

            <SignedIn>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={user?.fullName || "User"}
                    size="sm"
                    src={user?.imageUrl || "/default-avatar.png"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Account options" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold text-sm text-default-500">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </DropdownItem>

                  <DropdownItem
                    key="manage-account"
                    onClick={() => router.push("/user")}
                    className="place-items-center space-x-5"
                  >
                    <div className="flex items-center gap-3">
                      <i className="pi pi-cog text-lg" />
                      <span>Manage Account</span>
                    </div>
                  </DropdownItem>

                  <DropdownItem
                    key="sign-out"
                    onClick={() => signOut(() => router.replace("/admin/login"))}
                    className="place-items-center space-x-5"
                  >
                    <div className="flex items-center gap-3">
                      <i className="pi pi-sign-out text-lg" />
                      <span>Sign Out</span>
                    </div>
                  </DropdownItem>

                  <DropdownItem
                    key="delete"
                    onClick={handleAccountDelete}
                    className="text-danger place-items-center space-x-5"
                  >
                    <div className="flex items-center gap-3">
                      <i className="pi pi-trash text-lg" />
                      <span>Delete Account</span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SignedIn>

            <NavbarItem>
              <ThemeSwitch />
            </NavbarItem>
          </div>
        </NavbarContent>
      </Navbar>
    )
  );
}
