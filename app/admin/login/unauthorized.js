/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-semibold mb-4">401 - Unauthorized</h1>
      <p className="text-gray-600 mb-6">
        You don’t have access to this page. Please log in.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go to Login
        </Link>
    </main>
  );
}
