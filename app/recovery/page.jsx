/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Link,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/authSlice";

export default function RecoveryPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, resetSuccess, error } = useSelector((state) => state.auth);

  const userId = params.get("userId");
  const secret = params.get("secret");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (resetSuccess) {
      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    }
  }, [resetSuccess, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      setMessage("Enter all fields");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    if (!userId || !secret) {
      setMessage("Invalid or missing reset link");
      return;
    }

    await dispatch(resetPassword({ userId, secret, password }));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black px-4 transition-colors">
      <Card
        isBlurred
        shadow="lg"
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800"
      >
        <CardHeader className="flex flex-col items-center">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Reset Your Password
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter your new password below
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="password"
              label="New Password"
              variant="bordered"
              radius="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="primary"
              isRequired
            />

            <Input
              type="password"
              label="Confirm Password"
              variant="bordered"
              radius="lg"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              color="primary"
              isRequired
            />

            {(message || error) && (
              <p
                className={`text-center text-sm ${
                  message.includes("successful") || resetSuccess
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message || error}
              </p>
            )}

            <Button
              type="submit"
              color="primary"
              fullWidth
              radius="lg"
              isLoading={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardBody>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Go back to{" "}
            <Link href="/login" underline="always" color="primary">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
