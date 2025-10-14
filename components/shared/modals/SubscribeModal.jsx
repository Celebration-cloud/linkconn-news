/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { Logo, MailIcon } from "@/components/icons";
import { showToast } from "@/utils/toast";

export const SubscribeModal = ({
  title = "Subscribe",
  className = "bg-yellow-400 text-black font-semibold",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  const subscribed = localStorage.getItem("subscribed");
  const lastShown = localStorage.getItem("subscribe-last-shown");
  const now = Date.now();

  // Only open if not subscribed and 1 hour has passed since last show
  if (!subscribed && (!lastShown || now - parseInt(lastShown, 10) > 3600000)) {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    localStorage.setItem("subscribe-last-shown", now.toString());
    return () => clearTimeout(timer);
  }
}, []);


  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/public/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (result.success) {
        showToast({
          color: "success",
          description: "You're subscribed! Check your inbox for updates.",
          title: "Success",
        });
        reset();
        setIsOpen(false);
      } else {
        showToast({
          color: "danger",
          description:
            "Subscription failed. Try again later: " +
            (result.error || "Unknown error"),
          title: "Error",
        });
      }
    } catch (err) {
      showToast({
        color: "danger",
        description:
          "Something went wrong. Please try again later: " + err.message,
        title: "Error",
      });
    }
  };

  return (
    <>
      {/* Manual trigger button */}
      <Button {...props} className={className} onPress={() => setIsOpen(true)}>
        {title}
      </Button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="md"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-2">
                <Logo height={50} width={120} />
                <h2 className="text-xl font-bold">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  Get the latest news, insights, and stories from LinkOn News.
                </p>
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    fullWidth
                    endContent={<MailIcon className="text-2xl" />}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />

                  <ModalFooter className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="light"
                      onPress={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-yellow-400 text-black font-semibold"
                      isLoading={isSubmitting}
                    >
                      Subscribe
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
