/* eslint-disable react/react-in-jsx-scope */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Checkbox,
  Link,
} from "@heroui/react";
import { MailIcon, LockIcon } from "../icons";
import { useAuthUI } from "@/context/AuthUIContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { showToast } from "@/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice";

export default function LoginModal() {
  const dispatch = useDispatch();
  const { isOpen, onOpenChange, selectedTab, switchTo } = useAuthUI();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onLogin = async (data) => {
    try {
      onOpenChange(false);

      const res = await dispatch(loginUser(data));

      if (res.meta.requestStatus === "fulfilled") {
        showToast({
          title: "Login successful",
          color: "success",
          description: `Welcome back, ${res.payload.user.name}`,
          duration: 4000,
        });
        reset();
      } else {
        showToast({
          title: "Login failed",
          color: "danger",
          description: res.payload || "Invalid credentials",
          duration: 4000,
        });
      }
    } catch (err) {
      showToast({
        title: "Login failed",
        color: "danger",
        description: err?.message || "Something went wrong",
        duration: 4000,
      });
    }
  };

  if (selectedTab !== "login") return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center gap-4">
              <Image
                src={siteConfig.logo}
                alt="Logo"
                width={64}
                height={64}
                priority
              />
              <span>Log In</span>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter email"
                  variant="bordered"
                  endContent={<MailIcon />}
                  {...register("email", {
                    required: "Email required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  variant="bordered"
                  endContent={<LockIcon />}
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
                <div className="flex justify-between items-center">
                  <Checkbox
                    {...register("remember")}
                    classNames={{ label: "text-small" }}
                  >
                    Remember me
                  </Checkbox>
                  <Link
                    as="button"
                    size="sm"
                    onClick={() => switchTo("forgot")}
                    className="text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  loading={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              {error && (
                <p className="text-sm text-center text-red-500 mt-2">{error}</p>
              )}
              <p className="text-sm text-center text-gray-500 mt-2">
                Don’t have an account?{" "}
                <button
                  onClick={() => switchTo("signup")}
                  className="text-blue-400 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
