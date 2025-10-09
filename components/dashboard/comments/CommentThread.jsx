/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useState } from "react";
import Comment from "./Comment";

export default function CommentThread({
  comments,
  parentId = null,
  onReply,
  onLikeDislike,
  userVotes,
}) {
  const [visibleReplies, setVisibleReplies] = useState({});

  const toggleReplies = (id) =>
    setVisibleReplies((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={parentId ? "ml-12 mt-2" : ""}>
      {comments.map((comment) => (
        <div key={comment.$id}>
          <Comment
            comment={comment}
            onReply={onReply}
            onLikeDislike={onLikeDislike}
            isReply={!!parentId}
            userVotes={userVotes}
          />

          {(comment.replies || []).length > 0 && (
            <div className="ml-6 mt-1">
              {visibleReplies[comment.$id] ? (
                <>
                  <CommentThread
                    comments={comment.replies}
                    parentId={comment.$id}
                    onReply={onReply}
                    onLikeDislike={onLikeDislike}
                  />
                  <button
                    onClick={() => toggleReplies(comment.$id)}
                    className="text-xs text-blue-600 mt-1 hover:underline"
                  >
                    Hide replies ▲
                  </button>
                </>
              ) : (
                <button
                  onClick={() => toggleReplies(comment.$id)}
                  className="text-xs text-blue-600 mt-1 hover:underline"
                >
                  View replies ({comment.replies.length}) ▼
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
