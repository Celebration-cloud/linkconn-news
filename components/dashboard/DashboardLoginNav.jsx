"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "../theme-switch";

export const DashboardLoginNav = () => {
  return (
    <Navbar
      maxWidth="full"
      className="shadow-sm backdrop-blur-md sticky top-0 z-50 bg-background pt-6"
    >
        {/* Branding */}
        <NavbarBrand className="pl-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={siteConfig.logo}
              alt="Linkcon News Logo"
              width={208}
              height={56}
              priority
              className="w-52 h-14 object-contain"
            />
          </Link>
        </NavbarBrand>

        {/* Nav Actions */}
        <NavbarContent justify="end" className="gap-4">
          <NavbarItem className="hidden sm:flex">
            <Link
              href="/admin"
              className="text-sm font-medium text-default-600 hover:text-primary transition"
            >
              Login
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Button
              as={Link}
              href="/admin"
              size="sm"
              color="primary"
              variant="flat"
            >
              Get Started
            </Button>
          </NavbarItem>

          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

      {/* Decorative Line */}
      <div className="absolute -bottom-0.5 left-0 w-full h-0.5">
        <div className="flex h-full w-full">
          <div className="w-1/12 bg-black dark:bg-white" />
          <div className="w-1/6 bg-blue-500" />
          <div className="w-3/4 bg-black dark:bg-white" />
        </div>
      </div>
    </Navbar>
  );
};
