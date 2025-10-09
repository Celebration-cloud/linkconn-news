/* eslint-disable react/react-in-jsx-scope */
"use client";;
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Image } from "@heroui/react";
import { ThemeSwitch } from "../theme-switch";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";
import { useUser, UserButton } from "@clerk/nextjs";

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
  // const router = useRouter();
  const { isLoaded } = useUser();
  // const { signOut } = useClerk();

  const hideNavbar = hiddenNavbarRoutes.includes(pathname);
  if (!isLoaded) return null;


// const handleAccountDelete = async () => {
//   const confirmDelete = confirm(
//     "Are you sure you want to permanently delete your account? This action cannot be undone."
//   );
//   if (!confirmDelete) return;

//   try {
//     // 1. Delete Clerk user
//     await user.delete();

//     // 2. Delete Appwrite publisher record using action
//     await deletePublisher();

//     addToast({
//       title: "Your account has been deleted.",
//       description: "Your account has been deleted successfully",
//       color: "success",
//     });

//     router.push("/admin/login");
//   } catch (err) {
//     console.error(err);
//     addToast({
//       title: "Failed to delete account.",
//       description:
//         err.message || "Something went wrong while deleting account.",
//       color: "warning",
//     });
//   }
// };


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
            {/* <NavbarItem>
              <Badge color="primary" variant="solid" content="3">
                <i className="pi pi-comment text-4xl" />
              </Badge>
            </NavbarItem> */}
            <NavbarItem>
              <UserButton
                afterSignOutUrl="/admin/login"
                userProfileMode="navigation"
                appearance={{
                  elements: {
                    avatarBox: "ring-2 ring-blue-500", // small customization
                  },
                }}
                userButtonMenuItems={{
                  account: true, // keep "Manage account"
                  signOut: true, // keep "Sign out"
                  // custom option
                }}
              />
            </NavbarItem>
            <NavbarItem>
              <ThemeSwitch />
            </NavbarItem>
          </div>
        </NavbarContent>
      </Navbar>
    )
  );
}
