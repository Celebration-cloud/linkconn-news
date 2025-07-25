import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createArticle,
  fetchMyArticles,
  updateArticle,
  deleteArticle,
  fetchArticleById,
} from "@/lib/actions/article";
import { showToast } from "@/utils/toast";

// Fetch all articles by logged-in user
export const fetchArticlesThunk = createAsyncThunk(
  "article/fetchMy",
  async () => {
    const res = await fetchMyArticles();
    return res;
  }
);

// Create a new article
export const createArticleThunk = createAsyncThunk(
  "article/create",
  async (data) => {
    const res = await createArticle(data);
    return res;
  }
);

// Get article by id
export const fetchArticleByIdThunk = createAsyncThunk(
  "article/fetchById",
  async (id) => {
    const res = await fetchArticleById(id);
    return res;
  }
);

// Update an article
export const updateArticleThunk = createAsyncThunk(
  "article/update",
  async ({ id, data }) => {
    const res = await updateArticle(id, data);
    return res;
  }
);

// Delete an article
export const deleteArticleThunk = createAsyncThunk(
  "article/delete",
  async (id) => {
    const res = await deleteArticle(id);
    return { id, res };
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ARTICLES
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        state.articles = action.payload.data || [];
        state.loading = false;
      })
      .addCase(fetchArticlesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        showToast({
          title: "Failed to fetch articles",
          description: action.error.message,
          color: "danger",
        });
      })

      // CREATE ARTICLE
      .addCase(createArticleThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.articles.unshift(action.payload.data);
        state.loading = false;
        showToast({
          title: "Article created successfully",
          color: "success",
        });
      })
      .addCase(createArticleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        showToast({
          title: "Failed to create article",
          description: action.error.message,
          color: "danger",
        });
      })

      // FETCH SINGLE ARTICLE
      .addCase(fetchArticleByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticleByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;
        const existingIndex = state.articles.findIndex(
          (a) => a.$id === updated.$id
        );

        if (existingIndex !== -1) {
          state.articles[existingIndex] = updated;
        } else {
          state.articles.push(updated);
        }
      })
      .addCase(fetchArticleByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        showToast({
          title: "Failed to load article",
          description: action.error.message,
          color: "danger",
        });
      })

      // UPDATE ARTICLE
      .addCase(updateArticleThunk.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          (a) => a.$id === action.payload.data.$id
        );
        if (index !== -1) {
          state.articles[index] = action.payload.data;
        }
        showToast({
          title: "Article updated",
          color: "success",
        });
      })
      .addCase(updateArticleThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to update article",
          description: action.error.message,
          color: "danger",
        });
      })

      // DELETE ARTICLE
      .addCase(deleteArticleThunk.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (a) => a.$id !== action.payload.id
        );
        showToast({
          title: "Article deleted",
          color: "warning",
        });
      })
      .addCase(deleteArticleThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to delete article",
          description: action.error.message,
          color: "danger",
        });
      });
  },
});

export default articleSlice.reducer;
