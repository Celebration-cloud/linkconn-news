/* eslint-disable react/react-in-jsx-scope */
"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/react";
import { Button } from "@heroui/react";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import SocialIcons from "./icons/SocialIcons";
import { useState } from "react";
import { SubscribeModal } from "./shared/modals/SubscribeModal";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import UnifiedAuthModal from "./dashboard/UnifiedAuthModal";

/**
 * Full Navbar
 * - All links come from siteConfig
 * - No hard-coded Trending / Latest
 * - Top links, categories, navItems supported
 */

const COLOR_MAP = {
  blue: { primary: "text-blue-600", hover: "text-blue-500" },
  red: { primary: "text-red-600", hover: "text-red-500" },
  green: { primary: "text-green-600", hover: "text-green-500" },
  amber: { primary: "text-amber-600", hover: "text-amber-500" },
  purple: { primary: "text-purple-600", hover: "text-purple-500" },
  yellow: { primary: "text-yellow-400", hover: "text-yellow-300" },
  cyan: { primary: "text-cyan-600", hover: "text-cyan-500" },
  pink: { primary: "text-pink-600", hover: "text-pink-500" },
  indigo: { primary: "text-indigo-600", hover: "text-indigo-500" },
  orange: { primary: "text-orange-600", hover: "text-orange-500" },
};

export function Navbar() {
  const pathname = usePathname() || "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);

  const isActive = (href) => {
    if (!href) return false;
    // exact or startsWith for section routes
    return pathname === href || pathname.startsWith(href + "/");
  };

  const searchBar = (
    <SearchBar />
  );

  return (
    <>
      {/* Top Utility Bar (desktop only) */}
      <div className="hidden lg:flex bg-blue-700 text-white px-6 py-2 text-sm justify-between">
        <div className="flex gap-4">
          {siteConfig.topLinks?.map((link, i) => (
            <NextLink
              key={i}
              href={link.href}
              className={`hover:text-yellow-300 ${
                isActive(link.href) ? COLOR_MAP.yellow.primary : ""
              }`}
            >
              {link.label}
            </NextLink>
          ))}
        </div>

        <div className="flex gap-4">
          <NextLink
            href="/about"
            className={`hover:text-yellow-300 ${isActive("/about") ? COLOR_MAP.yellow.primary : ""}`}
          >
            About Us
          </NextLink>
          <NextLink
            href="/contact"
            className={`hover:text-yellow-300 ${isActive("/contact") ? COLOR_MAP.yellow.primary : ""}`}
          >
            Contact Us
          </NextLink>
        </div>
      </div>

      {/* Main Header */}
      <HeroUINavbar
        position="static"
        isBordered
        maxWidth="2xl"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white  w-full overflow-x-auto scrollbar-hide md:h-44 max-md:py-3"
      >
        <NavbarContent justify="start" className="hidden sm:flex">
          <SocialIcons size="text-2xl" />
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarBrand>
            <NextLink href="/" className="hidden md:flex items-center gap-2">
              <Logo className="h-20" height={100} width={220} />
            </NextLink>
            <NextLink href="/" className="flex md:hidden items-center gap-2">
              <Logo className="md:h-20" height={50} width={120} />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Right actions on desktop */}
        <NavbarContent
          justify="end"
          className="hidden sm:flex items-center gap-4"
        >
          <Button
            isIconOnly
            className="border-white bg-white"
            radius="full"
            variant="bordered"
            onPress={() => setSearchBarActive((s) => !s)}
          >
            <SearchIcon className="text-blue-500 font-bold" />
          </Button>

          <ThemeSwitch />
          <SubscribeModal />
          <UnifiedAuthModal />
        </NavbarContent>

        {/* Mobile actions */}
        <NavbarContent justify="end" className="sm:hidden">
          <Button
            isIconOnly
            className="border-white bg-white"
            radius="full"
            onPress={() => setSearchBarActive((prev) => !prev)}
            variant="bordered"
          >
            <SearchIcon className="text-blue-500 font-bold" />
          </Button>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="bg-blue-600 text-white mt-6 px-4 pb-6">
          <div className="mt-6 flex flex-col gap-6 mb-10">
            {/* Top Links */}
            <div className="flex flex-col gap-3">
              <p className="uppercase text-xs text-blue-200 tracking-wide">
                Top Links
              </p>
              {siteConfig.topLinks?.map((link, i) => (
                <NavbarMenuItem key={`top-${i}`}>
                  <NextLink
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-yellow-400"
                        : "hover:text-yellow-300"
                    }`}
                  >
                    {link.label}
                  </NextLink>
                </NavbarMenuItem>
              ))}

              <NavbarMenuItem>
                <NextLink
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive("/about")
                      ? "text-yellow-400"
                      : "hover:text-yellow-300"
                  }`}
                >
                  About Us
                </NextLink>
              </NavbarMenuItem>

              <NavbarMenuItem>
                <NextLink
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive("/contact")
                      ? "text-yellow-400"
                      : "hover:text-yellow-300"
                  }`}
                >
                  Contact Us
                </NextLink>
              </NavbarMenuItem>
            </div>

            <hr className="border-blue-400/40" />

            {/* Categories */}
            <div className="flex flex-col gap-3">
              <p className="uppercase text-xs text-blue-200 tracking-wide">
                Categories
              </p>

              <details className="group">
                <summary className="cursor-pointer list-none text-lg font-semibold hover:text-yellow-300">
                  Explore Categories
                </summary>

                <div className="mt-2 ml-3 flex flex-col gap-2">
                  {siteConfig.categories?.map((cat, i) => (
                    <NextLink
                      key={i}
                      href={`/${cat.key}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-base transition-colors ${
                        isActive(`/${cat.key}`)
                          ? "text-yellow-400"
                          : "hover:text-yellow-300"
                      }`}
                    >
                      {cat.label}
                    </NextLink>
                  ))}
                </div>
              </details>
            </div>

            <hr className="border-blue-400/40" />

            {/* Main nav items */}
            <div className="flex flex-col gap-3">
              <p className="uppercase text-xs text-blue-200 tracking-wide">
                Sections
              </p>
              {siteConfig.navItems?.map((item, i) => (
                <NavbarMenuItem key={`nav-${i}`}>
                  <NextLink
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-yellow-400"
                        : "hover:text-yellow-300"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                </NavbarMenuItem>
              ))}
            </div>

            <hr className="border-blue-400/40" />

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <UnifiedAuthModal />
              <SubscribeModal />
            </div>
          </div>
        </NavbarMenu>
      </HeroUINavbar>

      {/* Secondary nav (center links) */}
      <HeroUINavbar
        position="sticky"
        isBordered
        maxWidth="2xl"
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hidden sm:flex"
      >
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-center gap-6 px-4 min-w-max">
            {siteConfig.navItems?.map((item, i) => (
              <NavbarItem key={i}>
                <NextLink
                  href={item.href}
                  className={`font-medium whitespace-nowrap hover:text-yellow-300 ${
                    isActive(item.href) ? COLOR_MAP.yellow.primary : ""
                  }`}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
        </div>
      </HeroUINavbar>

      {/* Search bar row */}
      {searchBarActive && (
        <HeroUINavbar
          position="sticky"
          isBordered
          maxWidth="2xl"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white"
        >
          <div className="w-full flex justify-center items-center">
            <NavbarContent justify="center" className="w-2/3">
              {searchBar}
            </NavbarContent>
          </div>
        </HeroUINavbar>
      )}
    </>
  );
}
