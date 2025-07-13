"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function admin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return null;
}