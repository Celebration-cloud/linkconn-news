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
      className="shadow-sm backdrop-blur-md flex-none sticky top-0 pb-10 z-50 bg-background"
    >
      <div className="flex items-center justify-between w-full pt-10 md:px-8 lg:px-12">
        {/* Branding */}
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={siteConfig.logo}
              alt="Linkcon news logo"
              width={100}
              height={100}
              priority
              className="w-52 h-14"
              loading="eager"
            />
          </Link>
        </NavbarBrand>

        {/* Nav actions */}
        <NavbarContent justify="end" className="gap-4 flex *:items-center">
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
      </div>

      {/* 🔽 Decorative underline bar INSIDE the Navbar */}
      <div className="absolute -bottom-10 left-0 right-0 w-full h-0.5  ">
        <div className="flex items-center w-full h-1">
          <div className="w-1/6 bg-black h-full" />
          <div className="w-1/6 bg-blue-500 h-full" />
          <div className="w-2/3 bg-black h-full" />
        </div>
      </div>
    </Navbar>
  );
};
