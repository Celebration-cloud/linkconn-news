/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useAuthUI } from "@/context/AuthUIContext";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { Button, Avatar } from "@heroui/react";
import { showToast } from "@/utils/toast";

export default function UnifiedAuthModal() {
  const { switchTo, user, profile, logout, loading } = useAuthUI();

  const handleLogout = async () => {
    await logout();
    showToast({
      title: "Logged out successfully",
      color: "success",
      description: "You have been logged out.",
      duration: 4000,
    });
  };

  if (loading) return null;

  return (
    <>
      {!user ? (
        <Button
          color="primary"
          onPress={() => switchTo("login")}
          variant="bordered"
          className="border-white text-inherit px-4 py-2"
        >
          Login
        </Button>
      ) : (
        <div className="flex items-center gap-3 bg-blue-600 p-2 rounded-md">
          <Avatar size="sm" src={profile?.cover} name={user.name?.[0]} />

          <div className="flex flex-col min-w-0">
            <p className="font-medium text-white truncate">
              {user.name.length > 6 ? user.name.slice(0, 6) + "..." : user.name}
            </p>
            <p className="text-sm text-gray-200 truncate">
              {user.email.length > 6
                ? user.email.slice(0, 6) + "..."
                : user.email}
            </p>
          </div>

          <div className="ml-auto">
            <Button
              color="secondary"
              onPress={handleLogout}
              variant="bordered"
              size="sm"
              className="text-white border-white"
            >
              Logout
            </Button>
          </div>
        </div>
      )}

      <LoginModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </>
  );
}
