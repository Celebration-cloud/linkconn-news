/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Spinner } from "@heroui/spinner";

const LoadingScreen = () => {
  return (
    <div suppressHydrationWarning className="flex justify-center h-screen">
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <Spinner
          size="lg"
          color="primary"
          className="animate-spin drop-shadow-md text-primary"
        />
        <p className="text-sm font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;