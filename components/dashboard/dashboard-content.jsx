/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPublisherThunk } from "@/store/publisherSlice";
import { Button, Chip } from "@heroui/react";

export default function DashboardContent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const publisher = useSelector((state) => state.publisher.data);
  const loading = useSelector((state) => state.publisher.loading);
  const [revalidate, setRevalidate] = useState(false);
  
  const dashboard = [
    {
      title: "Published",
      count: publisher?.published || 0,
      icon: "pi pi-check-circle",
    },
    { title: "Liked", count: publisher?.liked || 0, icon: "pi pi-heart" },
    {
      title: "Followers",
      count: publisher?.followers || 0,
      icon: "pi pi-users",
    },
    {
      title: "Following",
      count: publisher?.following || 0,
      icon: "pi pi-users",
    },
  ];

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      dispatch(createPublisherThunk({ userId: user.id }));
    }
    // Only run when these change
  }, [isLoaded, isSignedIn, user?.id, revalidate]);

  // Call this function to revalidate (refresh) publisher data
  const handleRevalidate = () => setRevalidate((prev) => !prev);

  return (
    <>
      <div className="flex items-center justify-around mb-6 gap-5 bg-gray-100 px-10 py-5 rounded-sm shadow-md dark:bg-gray-800 ">
        {dashboard.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <i className={item.icon + " text-2xl"}></i>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-md shadow-sm">
        <div className="flex items-center gap-4 justify-center w-full">
          <p className="text-2xl text-center ">
            Welcome, {user?.firstName || "Publisher"}!,
          </p>
          <Chip
            color={user.publicMetadata.role === "admin" ? "warning" : "success"}
            variant="bordered"
          >
            {user.publicMetadata.role}
          </Chip>
        </div>
        <article className="mt-4 text-center text-sm text-gray-500">
          {loading
            ? "Loading your publisher data..."
            : publisher
              ? `You have ${publisher.published} published posts, ${publisher.liked} likes, ${publisher.followers} followers, and you're following ${publisher.following} others.`
              : "No publisher data found."}
        </article>
        <div className="flex justify-center mt-4">
          <Button
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded"
            onPress={handleRevalidate}
          >
            Revalidate
          </Button>
        </div>
      </div>
    </>
  );
}
