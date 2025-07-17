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
  const handleLike = () =>
    onLikeDislike(comment.id, "likes", isReply, parent?.id);
  const handleDislike = () =>
    onLikeDislike(comment.id, "dislikes", isReply, parent?.id);

  const vote = userVotes?.[comment.id]; // current user's vote

  return (
    <div className={`mb-6 ${isReply ? "ml-12" : ""}`}>
      <div className="flex gap-3">
        <Avatar name={comment.author} size="sm" />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-black dark:text-white">{comment.author}</span>
            <span className="text-xs text-gray-500">{comment.time}</span>
          </div>
          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
            {comment.content.split(" ").map((w, i) =>
              w.startsWith("@") ? (
                <span key={i} className="text-blue-600 font-semibold">
                  {w}{" "}
                </span>
              ) : (
                w + " "
              )
            )}
          </p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                onPress={handleLike}
                className={vote === "likes" ? "text-blue-500" : ""}
              >
                <i className="pi pi-thumbs-up" />
              </Button>
              <span>{comment.likes || 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                onPress={handleDislike}
                className={vote === "dislikes" ? "text-red-500" : ""}
              >
                <i className="pi pi-thumbs-down" />
              </Button>
              <span>{comment.dislikes || 0}</span>
            </div>

            <button
              onClick={() =>
                onReply(
                  parent ? parent.id : comment.id,
                  comment.author.split(" ")[0],
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
