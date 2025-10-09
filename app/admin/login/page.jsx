import { SignInButton } from "@clerk/nextjs";
import React from "react"
import { Button } from "@heroui/button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center px-4">
      <div className="w-[1024px] flex items-center justify-between py-10 px-5 gap-32">
        {/* Text Section */}
        <div className="w-full space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Create. Share.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Share your stories, opinions and life with over
            <span className="text-primary font-semibold">350 million</span>
            global active users.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="flex gap-4 pt-4">
              <SignInButton
                // appearance={{
                //   elements: {
                //     footerAction__signUp: "hidden", // hide the "Sign up" link
                //   },
                // }}
                redirectUrl="/admin/dashboard"
              >
                <Button variant="bordered" color="primary">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full flex justify-center mb-8 md:mb-0">
          <Image
            src="/Novelist writing-rafiki.svg"
            alt="Login Hero Image"
            width={500}
            height={500}
            className="h-auto object-contain max-w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
