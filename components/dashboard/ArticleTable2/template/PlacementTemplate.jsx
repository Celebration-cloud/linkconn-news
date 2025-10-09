/* eslint-disable react/react-in-jsx-scope */
"use client";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { updatePlacement } from "@/lib/actions/placementActions";
import { useUser } from "@clerk/nextjs";

export default function PlacementTemplate(row) {
  const placements = siteConfig.placements || [
    { key: "none", label: "None" },
    { key: "front-page", label: "Front Page" },
    { key: "breaking-news", label: "Breaking News" },
    { key: "top-stories", label: "Top Stories" },
  ];

  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "writer";

  const [currentPlacement, setCurrentPlacement] = useState(
    row.placement || "none"
  );
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  const current = placements.find((p) => p.key === currentPlacement);

  const severity =
    currentPlacement === "front-page"
      ? "danger"
      : currentPlacement === "breaking-news"
        ? "warning"
        : currentPlacement === "top-stories"
          ? "info"
          : "secondary";

  const handleChange = async (e) => {
    const newPlacement = e.value;
    setCurrentPlacement(newPlacement);
    setLoading(true);

    try {
      await updatePlacement(row.$id, newPlacement);
      setEditing(false);
    } catch (err) {
      console.error("❌ Failed to update placement:", err);
      setCurrentPlacement(row.placement); // rollback
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setCurrentPlacement(row.placement); // rollback
        setEditing(false);
      }
    };
    if (editing) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [editing, row.placement]);

  return (
    <div className="">
      {editing && isAdmin ? (
        <Dropdown
          ref={dropdownRef}
          value={currentPlacement}
          options={placements}
          onChange={handleChange}
          optionLabel="label"
          optionValue="key"
          className="w-36 text-xs"
          disabled={loading}
          autoFocus
        />
      ) : (
        <div
          className={isAdmin ? "cursor-pointer" : ""}
          onClick={() => isAdmin && !loading && setEditing(true)}
        >
          <Badge
            value={current?.label || "None"}
            severity={severity}
            className="px-2 py-1 text-xs font-medium rounded-md"
          />
        </div>
      )}
    </div>
  );
}
