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
} from "@heroui/react";
import { MailIcon, LockIcon } from "../icons";
import { useAuthUI } from "@/context/AuthUIContext";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { showToast } from "@/utils/toast";
import CoverUpload from "./cover-upload";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/store/authSlice";

export default function SignUpModal() {
  const { isOpen, onOpenChange, selectedTab, switchTo } = useAuthUI();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSignup = async (data) => {
    onOpenChange(false);

    const result = await dispatch(
      signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
        cover: data.cover,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      showToast({
        title: "Signup successful",
        color: "success",
        description: "Account created and logged in successfully.",
        duration: 4000,
      });
      reset();
    } else {
      showToast({
        title: "Signup failed",
        color: "danger",
        description: result.payload || "Something went wrong.",
        duration: 4000,
      });
    }
  };

  if (selectedTab !== "signup") return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      hideCloseButton
      scrollBehavior="inside"
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
              <span>Create Account</span>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmit(onSignup)} className="space-y-4">
                {/* Name Field */}
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  variant="bordered"
                  {...register("name", {
                    required: "Name required",
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                {/* Email Field */}
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  endContent={<MailIcon />}
                  {...register("email", {
                    required: "Email required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                {/* Password Field */}
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create password"
                  variant="bordered"
                  endContent={<LockIcon />}
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 8, message: "Min 8 characters" },
                  })}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />

                {/* Cover Upload */}
                <Controller
                  name="cover"
                  control={control}
                  rules={{
                    required: "Cover image required",
                    validate: (value) => {
                      if (!value) return "Please upload a cover image";
                      const urlPattern = /^https?:\/\/.+/i;
                      return urlPattern.test(value) || "Invalid URL format";
                    },
                  }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-semibold ${
                          errors.cover ? "text-red-500" : ""
                        }`}
                      >
                        Cover Image
                      </label>
                      <div
                        className={`${
                          errors.cover ? "border border-red-500" : ""
                        }`}
                      >
                        <CoverUpload
                          value={field.value}
                          onImageUpload={(url) => field.onChange(url)}
                        />
                      </div>

                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Cover preview"
                          unoptimized
                          width={800}
                          height={192}
                          className="mt-3 w-full h-48 object-cover rounded-md"
                        />
                      )}

                      {errors.cover && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.cover.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Terms Checkbox */}
                <Checkbox
                  {...register("terms", {
                    required: "You must agree to the terms",
                  })}
                  classNames={{ label: "text-small" }}
                >
                  I agree to the terms and conditions
                </Checkbox>
                {errors.terms && (
                  <p className="text-sm text-red-500">{errors.terms.message}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-center text-red-500 mt-2">
                    {error}
                  </p>
                )}
              </form>

              {/* Switch to Login */}
              <p className="text-sm text-center text-gray-500 mt-3">
                Already have an account?{" "}
                <button
                  onClick={() => switchTo("login")}
                  className="text-blue-400 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
