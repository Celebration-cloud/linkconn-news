/* eslint-disable react/react-in-jsx-scope */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@heroui/react";
import { MailIcon } from "../icons";
import { useAuthUI } from "@/context/AuthUIContext";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/authSlice";

export default function ForgotPasswordModal() {
  const { isOpen, onOpenChange, selectedTab } = useAuthUI();
  const dispatch = useDispatch();
  const { loading, forgotSuccess, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onForgot = async (data) => {
    await dispatch(
      forgotPassword({
        email: data.email,
        redirectUrl: `${window.location.origin}/recovery`,
      })
    );

    if (!error) reset();
  };

  if (selectedTab !== "forgot") return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Reset Password</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onForgot)} className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your registered email"
                  endContent={<MailIcon />}
                  variant="bordered"
                  {...register("email", {
                    required: "Email required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                {forgotSuccess && (
                  <p className="text-green-500 text-sm text-center">
                    Password reset email sent. Check your inbox.
                  </p>
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={loading}
                >
                  Send Reset Link
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
