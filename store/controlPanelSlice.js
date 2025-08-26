// store/slices/controlPanel.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  inviteUser,
  fetchInvitedUsers,
  updateUserRole,
  deleteInvitedUser,
  banUser,
  unbanUser,
} from "@/lib/actions/settings/control-panel";
import { showToast } from "@/utils/toast";

/**
 * Thunks
 */

// Invite user
export const inviteUserThunk = createAsyncThunk(
  "controlPanel/inviteUser",
  async (data) => {
    const res = await inviteUser(data);
    return res?.data ?? res;
  }
);

// Fetch users
export const fetchInvitedUsersThunk = createAsyncThunk(
  "controlPanel/fetchInvitedUsers",
  async () => {
    const res = await fetchInvitedUsers();
    console.log(res)
    return res;
  }
);

// Update role
export const updateUserRoleThunk = createAsyncThunk(
  "controlPanel/updateUserRole",
  async ({ userId, role }) => {
    const res = await updateUserRole(userId, role);
    return res?.data ?? res;
  }
);

// Delete invited user
export const deleteInvitedUserThunk = createAsyncThunk(
  "controlPanel/deleteInvitedUser",
  async (userId) => {
    const res = await deleteInvitedUser(userId);
    return { id: userId, res };
  }
);

// 🔥 Ban user
export const banUserThunk = createAsyncThunk(
  "controlPanel/banUser",
  async (userId) => {
    const res = await banUser(userId);
    return { id: userId, res };
  }
);

// 🔥 Unban user
export const unbanUserThunk = createAsyncThunk(
  "controlPanel/unbanUser",
  async (userId) => {
    const res = await unbanUser(userId);
    return { id: userId, res };
  }
);

/**
 * Slice
 */
export const controlPanelSlice = createSlice({
  name: "controlPanel",
  initialState: {
    invitedUsers: [],
    allInvite: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH USERS
      .addCase(fetchInvitedUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvitedUsersThunk.fulfilled, (state, action) => {
        const payload = action.payload;

        state.invitedUsers = Array.isArray(payload?.data) ? payload.data : [];
        state.allInvite = payload?.allInvite ?? {};
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchInvitedUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        showToast({
          title: "Failed to fetch users",
          description: action.error.message,
          color: "danger",
        });
      })

      // INVITE USER
      .addCase(inviteUserThunk.fulfilled, () => {
        showToast({ title: "User invited successfully", color: "success" });
      })
      .addCase(inviteUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to invite user",
          description: action.error.message,
          color: "danger",
        });
      })

      // UPDATE ROLE
      .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.invitedUsers.findIndex((u) => u.id === updated.id);
        if (index !== -1) {
          state.invitedUsers[index] = {
            ...state.invitedUsers[index], // keep existing fields
            ...action.payload, // update only what changed
          };
        }
        state.error = null;
        showToast({ title: "User role updated", color: "success" });
      })
      .addCase(updateUserRoleThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to update role",
          description: action.error.message,
          color: "danger",
        });
      })

      // DELETE INVITED USER
      .addCase(deleteInvitedUserThunk.fulfilled, (state, action) => {
        state.invitedUsers = state.invitedUsers.filter(
          (u) => u.id !== action.payload.id
        );
        showToast({ title: "User removed", color: "warning" });
      })
      .addCase(deleteInvitedUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to delete user",
          description: action.error.message,
          color: "danger",
        });
      })

      // 🔥 BAN USER
      .addCase(banUserThunk.fulfilled, (state, action) => {
        const index = state.invitedUsers.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.invitedUsers[index].banned = true;
        }
        showToast({ title: "User banned", color: "danger" });
      })
      .addCase(banUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to ban user",
          description: action.error.message,
          color: "danger",
        });
      })

      // 🔥 UNBAN USER
      .addCase(unbanUserThunk.fulfilled, (state, action) => {
        const index = state.invitedUsers.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.invitedUsers[index].banned = false;
        }
        showToast({ title: "User unbanned", color: "success" });
      })
      .addCase(unbanUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        showToast({
          title: "Failed to unban user",
          description: action.error.message,
          color: "danger",
        });
      });
  },
});

export default controlPanelSlice.reducer;
