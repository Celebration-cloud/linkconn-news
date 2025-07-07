"use client";

import { Spinner } from "@heroui/spinner";

export default LoadingScreen = () => {
  return (
    <div suppressHydrationWarning className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
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
