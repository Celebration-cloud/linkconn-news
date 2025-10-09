import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments, addComment, voteComment } from "@/lib/actions/comments";

// fetch top-level comments
export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (articleId) => {
    return await getComments(articleId);
  }
);

// fetch more replies
export const fetchMoreReplies = createAsyncThunk(
  "comments/fetchReplies",
  async ({ articleId, parentId, limit = 5, offset = 0 }) => {
    const data = await getComments(articleId, parentId, limit, offset);
    return {
      parentId,
      replies: data.comments || [],
      totalReplies: data.total || 0,
    };
  }
);

// post new comment
export const postComment = createAsyncThunk("comments/add", async (data) => {
  return await addComment(data);
});

// vote (like/dislike)
export const voteOnComment = createAsyncThunk(
  "comments/vote",
  async ({ commentId, type, articleId, userId }) => {
    return await voteComment(commentId, type, userId, articleId);
  }
);

// ✅ Helper: safely update vote logic for array structure
const updateVotesArray = (comment, userId, type) => {
  let userVotes = Array.isArray(comment.userVotes)
    ? [...comment.userVotes]
    : [];

  const voteKey = `${userId}:${type}`;
  const hasVotedSame = userVotes.includes(voteKey);

  // Remove any existing votes by this user (like or dislike)
  userVotes = userVotes.filter((v) => !v.startsWith(`${userId}:`));

  // Add new vote if not the same toggle
  if (!hasVotedSame) userVotes.push(voteKey);

  // Recalculate like/dislike counts
  const likes = userVotes.filter((v) => v.endsWith(":like")).length;
  const dislikes = userVotes.filter((v) => v.endsWith(":dislike")).length;

  return { ...comment, likes, dislikes, userVotes };
};

// ✅ Slice
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalComments: 0,
    totalLikes: 0,
    totalDislikes: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟢 FETCH COMMENTS
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const incoming = action.payload.comments || [];
        state.items = incoming.map((newC) => {
          const existing = state.items.find((c) => c.$id === newC.$id);
          return existing ? { ...existing, ...newC } : newC;
        });
        state.totalComments = action.payload.totalComments || 0;
        state.totalLikes = action.payload.totalLikes || 0;
        state.totalDislikes = action.payload.totalDislikes || 0;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🟢 ADD COMMENT
      .addCase(postComment.fulfilled, (state, action) => {
        if (action.payload.parentId) {
          const parent = state.items.find(
            (c) => c.$id === action.payload.parentId
          );
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(action.payload);
          }
        } else {
          state.items.unshift({ ...action.payload, replies: [] });
        }
      })

      // 🟢 VOTE (optimistic update)
      .addCase(voteOnComment.pending, (state, action) => {
        const { commentId, type, userId } = action.meta.arg;

        const applyVoteUpdate = (comment) => {
          if (comment.$id !== commentId) return comment;
          return updateVotesArray(comment, userId, type);
        };

        state.items = state.items.map((c) => {
          if (c.$id === commentId) return applyVoteUpdate(c);
          if (c.replies) {
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.$id === commentId ? applyVoteUpdate(r) : r
              ),
            };
          }
          return c;
        });
      })

      // 🟢 VOTE (sync after API returns)
      .addCase(voteOnComment.fulfilled, (state, action) => {
        const { commentId, likes, dislikes, userVotes } = action.payload;

        const updateComment = (comment) => {
          if (comment.$id === commentId) {
            return {
              ...comment,
              likes,
              dislikes,
              userVotes,
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map(updateComment),
            };
          }
          return comment;
        };

        state.items = state.items.map(updateComment);
      })

      // 🟢 LOAD MORE REPLIES
      .addCase(fetchMoreReplies.fulfilled, (state, action) => {
        const { parentId, replies } = action.payload;
        state.items = state.items.map((c) => {
          if (c.$id === parentId) {
            c.replies = [...(c.replies || []), ...replies];
          }
          return c;
        });
      });
  },
});

export default commentsSlice.reducer;
