"use client";

import { createPublisher } from "@/lib/actions/publisher";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function DashboardContent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [publisher, setPublisher] = useState(null);
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
    const fetchPublisher = async () => {
      try {
        if (isLoaded && isSignedIn && user?.id) {
          const response = await createPublisher();
          console.log(response);
          const data = response?.data;
          setPublisher(data);
        }
      } catch (error) {
        if (error.message === "Publisher not found.") {
          setPublisher(null);
        } else {
          console.error("Error fetching publisher:", error);
        }
      }
    };


    return () => {
      fetchPublisher()
    };
  }, [isLoaded, isSignedIn, user, revalidate]);

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
        <h3 className="text-2xl text-center">
          Welcome, {user?.firstName || "Publisher"}!
        </h3>
        <article className="mt-4 text-center text-sm text-gray-500">
          {publisher
            ? `You have ${publisher.published} published posts, ${publisher.liked} likes, ${publisher.followers} followers, and you're following ${publisher.following} others.`
            : "Loading your publisher data..."}
        </article>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded"
            onClick={handleRevalidate}
          >
            Revalidate
          </button>
        </div>
      </div>
    </>
  );
}
