/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { fetchInvitedUsersThunk } from "@/store/controlPanelSlice";
import { createPublisherThunk } from "@/store/publisherSlice";
import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { allInvite } = useSelector((state) => state.controlPanel);
  const dispatch = useDispatch();
  const { signOut } = useClerk();
  const pathname = usePathname()
  const router = useRouter();
  console.log(allInvite);

  useLayoutEffect(() => {
    dispatch(fetchInvitedUsersThunk());
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/admin/login");
    }
  }, [isSignedIn, isLoaded, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      dispatch(createPublisherThunk({ userId: user.id }));
    }

    // if()
    // Only run when these change
  }, [isLoaded, isSignedIn, user?.id]);

  // collect all banned emails
  const allInviteEmail =
    allInvite.documents
      ?.filter((item) => item.banned === true)
      .flatMap((item) => item.invitedEmail) || [];

  // current user email
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
console.log(pathname)
  // if banned -> show banned screen
  if (
    userEmail &&
    allInviteEmail.includes(userEmail) &&
    pathname !== "/admin/login"
  ) {
    const handleReturn = async () => {
      await signOut(); // clears Clerk session
      router.replace("/admin/login"); // go straight to login page
    };
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card
          shadow="lg"
          className="max-w-md w-full border border-red-100 rounded-2xl"
        >
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          </CardHeader>
          <CardBody className="space-y-4 text-center">
            <p className="text-gray-600">
              Your account has been{" "}
              <span className="text-red-500 font-semibold">banned</span>. If you
              believe this is a mistake, please contact support.
            </p>
            <Button
              color="danger"
              variant="solid"
              className="w-full"
              onPress={handleReturn}
            >
              Return to Login
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {!isLoaded ? <SpinnerLoading /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
