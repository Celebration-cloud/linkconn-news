"use client";

import { siteConfig } from "@/config/site";
import { useAuthUI } from "@/context/AuthUIContext";
import { account } from "@/lib/appwrite";
import { Button, Image, Modal, ModalBody, ModalContent, ModalHeader, Toast } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function SocialLoginAppwriteModal() {
  const { isOpen, onOpen, onOpenChange } = useAuthUI();
  const router = useRouter();

  const handleOAuthLogin = async (provider) => {
    account.createOAuth2Session(
      provider,
      `http://localhost:3000/admin/dashboard`, // success redirect
      `http://localhost:3000/admin/login` // failure redirect
    );

    // After successful login, redirect to dashboard
    Toast.success("Login successful! Redirecting to dashboard...");
    router.push("/admin/dashboard");
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Sign in / Sign up <i className="pi pi-angle-right" />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        hideCloseButton
        scrollBehavior="outside"
      >
        <ModalContent className="w-full max-w-md p-10">
          {() => (
            <>
              <ModalHeader className="text-center flex flex-col items-center gap-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src={siteConfig.logo}
                    alt="Linkcon News Logo"
                    width={208}
                    height={56}
                    className="w-52 h-14 object-contain"
                  />
                </div>
                <h2 className="text-2xl font-semibold">
                  Sign in to Linkcon Studio
                </h2>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="bordered"
                    className="flex items-center justify-center gap-3 py-2 hover:bg-blue-50 hover:text-black"
                    onPress={() => handleOAuthLogin("google")}
                  >
                    <i className="text-xl pi pi-google" />
                    Continue with Google
                  </Button>
                  <Button
                    variant="bordered"
                    className="flex items-center justify-center gap-3 py-2 text-blue-600 hover:bg-blue-50"
                    onPress={() => handleOAuthLogin("facebook")}
                  >
                    <i className="text-xl pi pi-facebook" />
                    Continue with Facebook
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
