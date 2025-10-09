/* eslint-disable react/react-in-jsx-scope */
"use client";
import NextLink from "next/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Logo } from "@/components/icons";
import { usePathname } from "next/navigation";
import SocialIcons from "../icons/SocialIcons";

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
export const Footer = () => {
    const pathname = usePathname();
    const isActive = (href) => pathname === href;
  return (
    <footer className="bg-blue-700 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Logo height={50} width={120} />
          </div>
          <p className="text-sm opacity-80">
            Delivering trusted journalism, breaking news, and in-depth analysis
            to keep you informed daily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NextLink
                href="/top-news"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/top-news") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Top News
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/trending"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/trending") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Trending
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/latest"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/latest") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Latest
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/opinion"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/opinion") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Opinion
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/sports"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/sports") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Sports
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/entertainment"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/entertainment") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Entertainment
              </NextLink>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NextLink
                href="/advertise"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/advertise") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Advertise with Us
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/careers"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/careers") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Careers
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/policy"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/policy") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Privacy Policy
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/terms"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/terms") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Terms of Service
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/contact"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/contact") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                Contact Us
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/about"
                className={`font-medium hover:text-yellow-300 ${
                  isActive("/about") ? COLOR_MAP.yellow.primary : ""
                }`}
              >
                About Us
              </NextLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Stay Connected</h4>
          <p className="text-sm opacity-80 mb-3">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Enter your email" className="text-black" />
            <Button className="bg-yellow-400 text-black">Subscribe</Button>
          </div>
          <SocialIcons />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Linkon News. All rights reserved.
      </div>
    </footer>
  );
};
