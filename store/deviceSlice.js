import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyDevices,
  logoutDevice,
  logoutAllDevices,
} from "@/lib/actions/settings/deviceActions";
import { showToast } from "@/utils/toast";

// 🔥 Thunks
export const fetchDevicesThunk = createAsyncThunk(
  "devices/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyDevices();
      return res; // array of sessions
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch devices");
    }
  }
);

export const logoutDeviceThunk = createAsyncThunk(
  "devices/logoutOne",
  async (sessionId, { rejectWithValue }) => {
    try {
      await logoutDevice(sessionId);
      return sessionId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to logout device");
    }
  }
);

export const logoutAllDevicesThunk = createAsyncThunk(
  "devices/logoutAll",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAllDevices();
      return true;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to logout all devices");
    }
  }
);

// 🔥 Slice
const deviceSlice = createSlice({
  name: "devices",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH DEVICES
      .addCase(fetchDevicesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchDevicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        showToast({
          title: "Failed to fetch devices",
          description: action.payload,
          color: "danger",
        });
      })

      // LOGOUT ONE
      .addCase(logoutDeviceThunk.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
        showToast({
          title: "Device Logged Out",
          description: "The selected device has been logged out successfully.",
          color: "success",
        });
      })
      .addCase(logoutDeviceThunk.rejected, (state, action) => {
        showToast({
          title: "Failed to logout device",
          description: action.payload,
          color: "danger",
        });
      })

      // LOGOUT ALL
      .addCase(logoutAllDevicesThunk.fulfilled, (state) => {
        const current = state.sessions.find((s) => s.isCurrent);
        state.sessions = current ? [current] : [];
        showToast({
          title: "All Other Devices Logged Out",
          description: "You are now logged in only on this device.",
          color: "success",
        });
      })
      .addCase(logoutAllDevicesThunk.rejected, (state, action) => {
        showToast({
          title: "Failed to logout all devices",
          description: action.payload,
          color: "danger",
        });
      });
  },
});

export default deviceSlice.reducer;
