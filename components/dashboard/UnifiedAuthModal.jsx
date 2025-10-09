/* eslint-disable react/react-in-jsx-scope */
"use client";;
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tabs,
  Tab,
  Input,
  Checkbox,
  Link,
  Button,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { MailIcon, LockIcon } from "../icons";
import { useAuthUI } from "@/context/AuthUIContext";

export default function UnifiedAuthModal() {
const { isOpen, onOpen, onOpenChange, selectedTab, switchTo } = useAuthUI();
 
  // React Hook Form setup for each tab
  const {
    register: loginRegister,
    reset: resetLogin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: signupRegister,
    reset: resetSignup,
    handleSubmit: handleSignup,
    formState: { errors: signupErrors },
  } = useForm();

  const {
    register: forgotRegister,
    reset: resetForgot,
    handleSubmit: handleForgot,
    formState: { errors: forgotErrors },
  } = useForm();

  // Handlers
  const onLogin = (data) => {
    console.log("Login Data:", data);
    // Handle login logic here
    resetLogin();
  };

  const onSignup = (data) => {
    console.log("Signup Data:", data);
    // Handle signup logic here
    resetSignup();
  };

  const onForgotPassword = (data) => {
    console.log("Forgot Password Email:", data);
    // Handle forgot password logic here
    resetForgot();
  };

  return <>
    <div className="flex gap-4 pt-4">
      <Button
        color="primary"
        onPress={() => {
          onOpen();
          switchTo("signup");
        }}
      >
        Sign Up
      </Button>
      <Button
        variant="bordered"
        color="primary"
        onPress={() => {
          onOpen();
          switchTo("login");
        }}
      >
        Sign In
      </Button>
    </div>

    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      hideCloseButton
      placement="center"
    >
      <ModalContent>
        {() => (
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => switchTo(key)}
            variant="solid"
            fullWidth
            className="w-full p-5"
          >
            {/* LOGIN TAB */}
            <Tab key="login" title="Login">
              <ModalHeader className="text-center">Welcome Back</ModalHeader>
              <ModalBody className="space-y-4">
                <form onSubmit={handleLogin(onLogin)} className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-blue-50"
                    >
                      <i className="text-xl pi pi-google" />
                      Continue with Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-blue-50 text-blue-600"
                    >
                      <i className="text-xl pi pi-facebook" />
                      Continue with Facebook
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="text-sm text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-200" />
                  </div>

                  <Input
                    label="Email"
                    variant="bordered"
                    placeholder="Enter your email"
                    endContent={<MailIcon />}
                    {...loginRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                    isInvalid={!!loginErrors.email}
                    errorMessage={loginErrors.email?.message}
                  />

                  <Input
                    label="Password"
                    type="password"
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={<LockIcon />}
                    {...loginRegister("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    isInvalid={!!loginErrors.password}
                    errorMessage={loginErrors.password?.message}
                  />

                  <div className="flex items-center justify-between">
                    <Checkbox {...loginRegister("remember")}>
                      Remember me
                    </Checkbox>
                    <Link
                      href="#"
                      size="sm"
                      onClick={() => switchTo("forgot")}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" color="primary" className="w-full">
                    Login
                  </Button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-2">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => switchTo("signup")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </ModalBody>
            </Tab>

            {/* SIGNUP TAB */}
            <Tab key="signup" title="Sign Up">
              <ModalHeader className="text-center">
                Create Account
              </ModalHeader>
              <ModalBody className="space-y-4">
                <form onSubmit={handleSignup(onSignup)} className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-blue-50"
                    >
                      <i className="text-xl pi pi-google" />
                      Sign up with Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-blue-50 text-blue-600"
                    >
                      <i className="text-xl pi pi-facebook" />
                      Sign up with Facebook
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="text-sm text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-200" />
                  </div>

                  <Input
                    label="Name"
                    variant="bordered"
                    placeholder="Full Name"
                    {...signupRegister("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    isInvalid={!!signupErrors.name}
                    errorMessage={signupErrors.name?.message}
                  />

                  <Input
                    label="Email"
                    variant="bordered"
                    placeholder="Enter your email"
                    endContent={<MailIcon />}
                    {...signupRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                    isInvalid={!!signupErrors.email}
                    errorMessage={signupErrors.email?.message}
                  />

                  <Input
                    label="Password"
                    type="password"
                    variant="bordered"
                    placeholder="Choose a password"
                    endContent={<LockIcon />}
                    {...signupRegister("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message:
                          "Password must contain at least one letter and one number",
                      },
                    })}
                    isInvalid={!!signupErrors.password}
                    errorMessage={signupErrors.password?.message}
                  />

                  <Button type="submit" color="primary" className="w-full">
                    Sign Up
                  </Button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-2">
                  Already have an account?{" "}
                  <button
                    onClick={() => switchTo("login")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </ModalBody>
            </Tab>

            {/* FORGOT PASSWORD TAB */}
            <Tab key="forgot" title="Forgot Password">
              <ModalHeader className="text-center">
                Reset Password
              </ModalHeader>
              <ModalBody className="space-y-4">
                <form
                  onSubmit={handleForgot(onForgotPassword)}
                  className="space-y-4"
                >
                  <Input
                    label="Email"
                    variant="bordered"
                    placeholder="Enter your email"
                    endContent={<MailIcon />}
                    {...forgotRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                    isInvalid={!!forgotErrors.email}
                    errorMessage={forgotErrors.email?.message}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    We’ll send a password reset link to your email.
                  </p>
                  <Button type="submit" color="primary" className="w-full">
                    Reset Password
                  </Button>
                </form>
              </ModalBody>
            </Tab>
          </Tabs>
        )}
      </ModalContent>
    </Modal>
  </>;
}
