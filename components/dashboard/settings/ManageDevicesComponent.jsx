/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDevicesThunk,
  logoutDeviceThunk,
  logoutAllDevicesThunk,
} from "@/store/deviceSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@heroui/react";
import { SpinnerLoading } from "@/components/spinner-loading";
import { useRouter } from "next/navigation";

export default function ManageDevicesComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sessions, loading } = useSelector((state) => state.devices);
console.log(sessions)
  // Back navigation
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(fetchDevicesThunk());
  }, [dispatch]);

  if (loading) return <SpinnerLoading />;

  return (
    <div className="space-y-6 py-5">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <span
          onClick={handleBack}
          className="text-2xl pi pi-angle-left cursor-pointer text-blue-600"
        ></span>
        <h1 className="text-2xl font-bold text-blue-700">Manage Devices</h1>
      </div>

      {/* Device list */}
      {sessions.map((s) => (
        <>
          {s.status !== "revoked" && (
            <Card
              key={s.id}
              shadow="sm"
              className="border border-blue-100 rounded-2xl"
            >
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <i className="pi pi-desktop text-blue-500 text-xl"></i>
                  <div>
                    <h2 className="font-semibold text-blue-800">
                      {s.browser || "Unknown Browser"} – {s.os || "Unknown OS"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {s.ipAddress || "Unknown IP"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <Chip
                  size="sm"
                  color={s.status === "active" ? "success" : "default"}
                  variant="flat"
                >
                  {s.status}
                </Chip>
              </CardHeader>

              <CardBody className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <i className="pi pi-clock text-gray-400"></i>
                  <span>
                    Last active: {new Date(s.lastActiveAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <i className="pi pi-map-marker text-gray-400"></i>
                  <span>
                    {s.city ? `${s.city}, ` : ""}
                    {s.country || "Unknown Location"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <i className="pi pi-globe text-gray-400"></i>
                  <span>{s.ipAddress}</span>
                </div>

                <div className="flex items-center gap-2">
                  <i className="pi pi-desktop text-gray-400"></i>
                  <span>
                    {s.browser} {s.browserVersion} – {s.os}
                  </span>
                </div>

                {s.isCurrent && (
                  <Chip color="primary" size="sm" variant="flat">
                    This Device
                  </Chip>
                )}
              </CardBody>

              <CardFooter className="flex justify-end">
                {!s.isCurrent ? (
                  <Button
                    color="danger"
                    size="sm"
                    variant="flat"
                    onClick={() => dispatch(logoutDeviceThunk(s.id))}
                  >
                    <i className="pi pi-sign-out mr-2"></i> Logout
                  </Button>
                ) : (
                  <Chip color="primary" size="sm" variant="flat">
                    Active Session
                  </Chip>
                )}
              </CardFooter>
            </Card>
          )}
        </>
      ))}

      {/* Logout all others */}
      {sessions.length > 1 && (
        <Button
          color="primary"
          variant="solid"
          className="w-full mt-4"
          onPress={() => dispatch(logoutAllDevicesThunk())}
        >
          <i className="pi pi-sign-out mr-2"></i> Logout All Other Devices
        </Button>
      )}
    </div>
  );
}
