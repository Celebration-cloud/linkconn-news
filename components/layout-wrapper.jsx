/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "./footer/Footer";
import { AdSlot } from "./shared/advertisement/AdSlot";

export const LayoutWrapper = ({ children }) => {
  return (
      <div className="relative flex min-h-screen flex-col bg-[var(--canvas)] text-[var(--ink)]">
        {/* Navbar */}
        <Navbar />

        {/* Top Ad Banner */}
        <div className="border-b border-[var(--line)] bg-[var(--surface)]">
          <AdSlot type="hero" placement="top" />
        </div>

        {/* Main Content with Side Ad */}
        <main id="main-content" className="mx-auto w-full max-w-7xl flex-grow px-0">
          {/* Main Section */}
          <div className="flex-1">
            {children}

            {/* Inline Ad inside content */}
            <div className="my-10">
              <AdSlot type="inline" placement="inline" />
            </div>
          </div>
        </main>

        {/* Bottom Ad Banner */}
        <div className="border-t border-[var(--line)] bg-[var(--surface)]">
          <AdSlot type="hero" placement="bottom" />
        </div>

        {/* Footer */}
        <Footer />
      </div>
  );
};
