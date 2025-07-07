"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function admin({children}) {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return null;
}