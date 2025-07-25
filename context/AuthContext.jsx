"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { createPublisherThunk } from "@/store/publisherSlice";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/admin/login");
    }
  }, [isSignedIn, isLoaded, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      dispatch(createPublisherThunk({ userId: user.id }));
    }
    // Only run when these change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, user?.id]);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {!isLoaded ? <SpinnerLoading /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
