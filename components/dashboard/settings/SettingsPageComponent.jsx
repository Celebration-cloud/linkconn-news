"use client";

import React from "react"
import Link from "next/link";
import { Card } from "@heroui/react";
import { useUser } from "@clerk/nextjs";

export default function SettingsPageComponent() {
    const { user } = useUser();
  return (
    <div className="p-6 flex flex-col gap-6 ">
      <h1 className="text-2xl font-bold text-blue-700">Settings</h1>

      {user.publicMetadata.role === "admin" && (
        <Link href="/admin/settings/control-panel">
          <Card className="p-4 cursor-pointer hover:bg-foreground-200 transition">
            <div className="flex justify-between items-center py-2 px-2">
              <div className="flex gap-2">
                <span className="text-2xl pi pi-cog mr-2 text-blue-600"></span>
                <p>Control Panel</p>
              </div>
              <span className="text-2xl pi pi-angle-right mr-2 text-blue-600"></span>
            </div>
          </Card>
        </Link>
      )}

      <Link href="/admin/settings/manage-device">
        <Card className="p-4 cursor-pointer hover:bg-foreground-200 transition">
          <div className="flex justify-between items-center py-2 px-2">
            <div className="flex gap-2">
              <span className="text-2xl pi pi-desktop mr-2 text-blue-600"></span>
              <p>Manage Device</p>
            </div>
            <span className="text-2xl pi pi-angle-right mr-2 text-blue-600"></span>
          </div>
        </Card>
      </Link>
    </div>
  );
}
