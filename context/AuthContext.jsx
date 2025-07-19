"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useLayoutEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user } = useUser();


  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {!isLoaded ? <SpinnerLoading /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
