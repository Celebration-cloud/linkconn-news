/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, databases, ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { showToast } from "@/utils/toast";

const db = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_DB_ID;
const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

// ---------- SIGNUP ----------
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, cover }, { rejectWithValue }) => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);

      await databases.createDocument(db, usersCollectionId, ID.unique(), {
        userId: user.$id,
        name,
        email,
        cover,
      });

      const res = await databases.listDocuments(db, usersCollectionId, [
        Query.equal("userId", user.$id),
      ]);
      const profile = res.documents[0] || null;

      showToast({
        title: "Signup Successful",
        description: "Your account was created successfully.",
        color: "success",
        duration: 4000,
      });

      return { user, profile };
    } catch (err) {
      const message = err.message?.includes("401")
        ? "Unauthorized"
        : err.message || "Signup failed";

      showToast({
        title: "Signup Error",
        description: message,
        color: "danger",
        duration: 4000,
      });

      return rejectWithValue(message);
    }
  }
);

// ---------- LOGIN ----------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      const res = await databases.listDocuments(db, usersCollectionId, [
        Query.equal("userId", user.$id),
      ]);
      const profile = res.documents[0] || null;

      return { user, profile };
    } catch (err) {
      const message = err.message?.includes("401")
        ? "Unauthorized"
        : err.message || "Login failed";

      return rejectWithValue(message);
    }
  }
);

// ---------- FETCH CURRENT USER ----------
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await account.get();
      const res = await databases.listDocuments(db, usersCollectionId, [
        Query.equal("userId", user.$id),
      ]);
      const profile = res.documents[0] || null;

      return { user, profile };
    } catch {
      showToast({
        title: "Session Error",
        description: "No active session found. Please log in again.",
        color: "warning",
        duration: 4000,
      });
      return rejectWithValue("No active session");
    }
  }
);

// ---------- LOGOUT ----------
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await account.deleteSession("current");

      showToast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        color: "success",
        duration: 3000,
      });

      return null;
    } catch (err) {
      const message = err.message || "Logout failed";
      showToast({
        title: "Logout Error",
        description: message,
        color: "danger",
        duration: 4000,
      });
      return rejectWithValue(message);
    }
  }
);

// ---------- FORGOT PASSWORD ----------
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, redirectUrl }, { rejectWithValue }) => {
    try {
      await account.createRecovery(email, redirectUrl, true);

      showToast({
        title: "Email Sent",
        description: "Password reset email sent. Check your inbox.",
        color: "success",
        duration: 4000,
      });

      return true;
    } catch (err) {
      const message = err.message || "Forgot password failed";
      showToast({
        title: "Error",
        description: message,
        color: "danger",
        duration: 4000,
      });
      return rejectWithValue(message);
    }
  }
);

// ---------- RESET PASSWORD ----------
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userId, secret, password }, { rejectWithValue }) => {
    try {
      await account.updateRecovery(userId, secret, password);

      showToast({
        title: "Password Reset",
        description: "Password has been updated successfully.",
        color: "success",
        duration: 4000,
      });

      return true;
    } catch (err) {
      const message = err.message || "Reset password failed";
      showToast({
        title: "Error",
        description: message,
        color: "danger",
        duration: 4000,
      });
      return rejectWithValue(message);
    }
  }
);

// ---------- SLICE ----------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    profile: null,
    loading: false,
    error: null,
    forgotSuccess: false,
    resetSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.profile = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.forgotSuccess = false;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgotSuccess = false;
        state.error = action.payload;
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.resetSuccess = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetSuccess = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
