/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  postComment,
  voteOnComment,
} from "@/store/commentsSlice";
import CommentThread from "./CommentThread";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/react";
import { siteConfig } from "@/config/site";

export default function CommentSection({
  articleId,
  user = {
    id: "user_demo_123",
    name: "Demo User",
    avatar: siteConfig.logo,
  },
}) {
  const dispatch = useDispatch();
  const { items: comments, loading } = useSelector((s) => s.comments);
  console.log("comments from redux:", comments);

  const [input, setInput] = useState("");
  const [replyMeta, setReplyMeta] = useState({ parentId: null });

  const loadComments = useCallback(() => {
    if (!articleId) return;
    dispatch(fetchComments(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    loadComments(); // runs once, or when articleId changes
  }, [loadComments]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    console.log("Submitting comment:", {
      articleId,
      parentId: replyMeta.parentId,
      authorId: user.id,
      authorName: user.name,
      avatar: user.avatar,
      content: input,
    });
    dispatch(
      postComment({
        articleId,
        parentId: replyMeta.parentId,
        authorId: user.id,
        authorName: user.name,
        avatar: user.avatar,
        content: input,
      })
    );

    setInput("");
    setReplyMeta({ parentId: null });
  };

const handleVote = (id, type) => {
  dispatch(
    voteOnComment({ commentId: id, type, userId: user.id, articleId })
  ).then(() => {
    setTimeout(() => loadComments(), 500);
  });
};

  const userVote = comments.userVotes
    ?.find((v) => v.startsWith(`${user.id}:`))
    ?.split(":")[1]; // => "like" or "dislike"

  return (
    <div className="py-6 space-y-6">
      {/* Input */}
      <div>
        <Textarea
          minRows={2}
          placeholder="Leave a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-sm dark:text-white bg-transparent border border-gray-700 rounded-md"
        />
        <div className="flex justify-end mt-2 gap-2">
          {replyMeta.parentId && (
            <Button
              size="sm"
              variant="light"
              onPress={() => setReplyMeta({ parentId: null })}
            >
              Cancel
            </Button>
          )}
          <Button size="sm" color="primary" onPress={handleSubmit}>
            {replyMeta.parentId ? "Reply" : "Comment"}
          </Button>
        </div>
      </div>

      {/* Comments */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CommentThread
          comments={comments}
          userVotes={userVote}
          articleId={articleId} // ✅ needed for fetchMoreReplies
          onReply={(pid, mention) => {
            setReplyMeta({ parentId: pid });
            setInput(`@${mention} `);
          }}
          onLikeDislike={handleVote}
        />
      )}
    </div>
  );
}
