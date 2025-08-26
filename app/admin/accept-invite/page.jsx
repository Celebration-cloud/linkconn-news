"use client";

import React from "react"
import { useEffect } from "react";
import { useClerk, useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function AcceptInvitePage() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const ticket = searchParams.get("__clerk_ticket");

    if (!ticket) {
      // No invitation ticket → fallback to login
      router.replace("/admin/login");
      return;
    }

    async function processInvite() {
      if (isSignedIn) {
        // If logged in with wrong account → sign out first
        await signOut();
        router.replace(`/admin/accept-invite?__clerk_ticket=${ticket}`);
        return;
      }

      // Not signed in → Clerk consumes ticket during sign-up
      // After sign-up/sign-in, send them to admin dashboard
      router.replace(
        `/admin/accept-invite/sign-up?__clerk_ticket=${ticket}&redirect_url=/admin/dashboard`
      );
    }

    processInvite();
  }, [isSignedIn, router, searchParams, signOut]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Processing your invitation...</p>
    </div>
  );
}
