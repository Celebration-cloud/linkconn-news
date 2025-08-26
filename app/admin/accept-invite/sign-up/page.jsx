"use client";

import React from "react"
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        fallbackRedirectUrl="/admin/dashboard"
      />
    </div>
  );
}
