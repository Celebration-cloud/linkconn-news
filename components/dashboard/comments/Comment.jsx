/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";

export default function Comment({
  comment,
  parent,
  onReply,
  onLikeDislike,
  isReply,
  userVotes,
}) {
  // ✅ Always use Appwrite IDs
  const commentId = comment.$id;

  const vote = userVotes; // now it's just "like" | "dislike" | undefined

  console.log("Current vote:", vote);

  const handleLike = () => {
    if (vote === "like") {
      onLikeDislike(commentId, "remove"); // ✅ remove like
    } else {
      onLikeDislike(commentId, "like");
    }
  };

  const handleDislike = () => {
    if (vote === "dislike") {
      onLikeDislike(commentId, "remove"); // ✅ remove dislike
    } else {
      onLikeDislike(commentId, "dislike");
    }
  };

  // ✅ Format time
  const formattedTime = new Date(comment.$createdAt).toLocaleString();

  return (
    <div className={`mb-6 ${isReply ? "ml-12" : ""}`}>
      <div className="flex gap-3">
        <Avatar src={comment.avatar} name={comment.authorName} size="sm" />
        <div className="flex-1">
          {/* Author + Time */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-black dark:text-white">
              {comment.authorName || "Anonymous"}
            </span>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>

          {/* Content */}
          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
            {comment.content?.split(" ").map((w, i) =>
              w.startsWith("@") ? (
                <span key={i} className="text-blue-600 font-semibold">
                  {w}{" "}
                </span>
              ) : (
                w + " "
              )
            )}
          </p>

          {/* Actions: Like, Dislike, Reply */}
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            {/* Like */}
            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                onPress={handleLike}
                className={vote === "like" ? "text-blue-500" : ""}
              >
                <i className="pi pi-thumbs-up" />
              </Button>
              <span>{comment.likes || 0}</span>
            </div>

            {/* Dislike */}
            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                onPress={handleDislike}
                className={vote === "dislike" ? "text-red-500" : ""}
              >
                <i className="pi pi-thumbs-down" />
              </Button>
              <span>{comment.dislikes || 0}</span>
            </div>

            {/* Reply */}
            <button
              onClick={() =>
                onReply(
                  parent ? parent.$id : comment.$id,
                  comment.authorName?.split(" ")[0] || "user",
                  !!parent
                )
              }
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
