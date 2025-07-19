// context/AuthUIContext.jsx
"use client";

import { createContext, useContext, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
const AuthUIContext = createContext();

export const AuthUIProvider = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState("login");
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useLayoutEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [isSignedIn, isLoaded, router]);

  const switchTo = (tabKey) => setSelectedTab(tabKey);

  return (
    <AuthUIContext.Provider
      value={{ isOpen, onOpen, onOpenChange, selectedTab, switchTo }}
    >
      {children}
    </AuthUIContext.Provider>
  );
};

export const useAuthUI = () => useContext(AuthUIContext);
