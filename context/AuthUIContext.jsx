/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { fetchCurrentUser, logoutUser } from "@/store/authSlice";
import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthUIContext = createContext(null);

export function AuthUIProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("login");

  const { user, profile, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (val) => setIsOpen(val);
  const switchTo = (tab) => {
    setSelectedTab(tab);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const logout = async () => {
    try {
      dispatch(logoutUser());
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthUIContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        onOpenChange,
        selectedTab,
        switchTo,
        user,
        loading,
        profile,
        logout,
      }}
    >
      {children}
    </AuthUIContext.Provider>
  );
}

export function useAuthUI() {
  const ctx = useContext(AuthUIContext);
  if (!ctx) throw new Error("useAuthUI must be used inside AuthUIProvider");
  return ctx;
}
