"use client";

import { useState } from "react";
import Comment from "./Comment";
import ReplyBox from "./ReplyBox";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

const initialComments = [
  {
    id: 1,
    author: "Ben Okafor",
    time: "a year ago",
    content: "another story again o",
    likes: 0,
    dislikes: 0,
    replies: [
      {
        id: 2,
        author: "Ojingulu_Celebration · Creator",
        time: "12 hours ago",
        content: "okay",
        likes: 0,
        dislikes: 0,
      },
      {
        id: 3,
        author: "Ojingulu_Celebration · Creator",
        time: "12 hours ago",
        content: "@Ojingulu_Celebration okay",
        likes: 0,
        dislikes: 0,
      },
    ],
  },
  {
    id: 4,
    author: "Kingsley Nyong",
    time: "a year ago",
    content:
      "did kind tori sef : no pesin name, no location. una dey whine Mee.",
    likes: 0,
    dislikes: 0,
    replies: [],
  },
];


export default function CommentSection() {
  const [comments, setComments] = useState(initialComments);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [replyText, setReplyText] = useState("");
  const [replyMeta, setReplyMeta] = useState({ parentId: null, mention: "" });
  const [newComment, setNewComment] = useState("");

  const toggleReplies = (id) =>
    setVisibleReplies((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleReplyClick = (parentId, mention = "", isReply = false) => {
    const tag = isReply ? `@${mention} ` : "";
    setReplyMeta({ parentId, mention });
    setReplyText(tag);
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      author: "You",
      time: "Just now",
      content: replyText,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === replyMeta.parentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );

    setReplyText("");
    setReplyMeta({ parentId: null, mention: "" });
  };

const handleLikeDislike = (id, type, isReply = false, parentId = null) => {
  setComments((prev) =>
    prev.map((comment) => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === id) {
              return updateVote(reply, id, type);
            }
            return reply;
          }),
        };
      }

      if (comment.id === id) {
        return updateVote(comment, id, type);
      }

      return comment;
    })
  );

  // Toggle or switch vote
  setUserVotes((prev) => {
    const previous = prev[id];

    // If clicking same vote again, remove it
    if (previous === type) {
      return { ...prev, [id]: null };
    }

    // Else, switch to new vote
    return { ...prev, [id]: type };
  });
};

// Helper to handle vote counts
function updateVote(item, id, type) {
  const currentVote = userVotes[id];
  const updated = { ...item };

  // Remove previous vote
  if (currentVote === "likes") updated.likes = (updated.likes || 1) - 1;
  if (currentVote === "dislikes")
    updated.dislikes = (updated.dislikes || 1) - 1;

  // Toggle or add new vote
  if (currentVote !== type) {
    updated[type] = (updated[type] || 0) + 1;
  }

  return updated;
}



  const handleNewCommentSubmit = () => {
    if (!newComment.trim()) return;

    const newTopComment = {
      id: Date.now(),
      author: "You",
      time: "Just now",
      content: newComment,
      replies: [],
    };

    setComments((prev) => [newTopComment, ...prev]);
    setNewComment("");
  };

  const isReplyingTo = (commentId) => replyMeta.parentId === commentId;

  return (
    <div className="py-6 space-y-6">
      {/* Top-level comment input */}
      <div>
        <Textarea
          minRows={2}
          maxRows={5}
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full text-sm dark:text-white bg-transparent border border-gray-700 rounded-md"
        />
        <div className="flex justify-end mt-2 gap-2">
          <Button size="sm" variant="light" onPress={() => setNewComment("")}>
            Cancel
          </Button>
          <Button size="sm" color="primary" onPress={handleNewCommentSubmit}>
            Comment
          </Button>
        </div>
      </div>

      {/* Comments */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            onReply={handleReplyClick}
            onLikeDislike={handleLikeDislike}
            userVotes={userVotes}
          />

          {/* Replies */}
          {comment.replies?.length > 0 && (
            <div className="ml-12 mt-2">
              {visibleReplies[comment.id] ? (
                <>
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="text-sm text-blue-600 mt-2"
                  >
                    Hide ▲
                  </button>
                  <div className="mt-3 space-y-3">
                    {comment.replies.map((reply) => (
                      <Comment
                        key={reply.id}
                        comment={reply}
                        parent={comment}
                        onReply={handleReplyClick}
                        onLikeDislike={handleLikeDislike}
                        isReply
                        userVotes={userVotes}
                      />
                    ))}
                    {/* Show reply box after last reply */}
                    {isReplyingTo(comment.id) && (
                      <ReplyBox
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onCancel={() =>
                          setReplyMeta({ parentId: null, mention: "" })
                        }
                        onSubmit={handleReplySubmit}
                      />
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => toggleReplies(comment.id)}
                  className="text-sm text-blue-600 mt-2"
                >
                  View replies ({comment.replies.length}) ▼
                </button>
              )}
            </div>
          )}

          {/* Show reply box under main comment if no replies */}
          {comment.replies.length === 0 && isReplyingTo(comment.id) && (
            <div className="ml-12 mt-2">
              <ReplyBox
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onCancel={() => setReplyMeta({ parentId: null, mention: "" })}
                onSubmit={handleReplySubmit}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
