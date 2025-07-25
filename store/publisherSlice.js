import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPublisher,
  getPublisher,
  updatePublisher,
  deletePublisher,
} from "@/lib/actions/publisher";

// Async thunks
export const fetchPublisher = createAsyncThunk(
  "publisher/fetchPublisher",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getPublisher(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createPublisherThunk = createAsyncThunk(
  "publisher/createPublisher",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createPublisher();
      console.log(res)
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updatePublisherThunk = createAsyncThunk(
  "publisher/updatePublisher",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updatePublisher(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deletePublisherThunk = createAsyncThunk(
  "publisher/deletePublisher",
  async (_, { rejectWithValue }) => {
    try {
      await deletePublisher();
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const publisherSlice = createSlice({
  name: "publisher",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPublisher
      .addCase(fetchPublisher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublisher.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPublisher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createPublisher
      .addCase(createPublisherThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // updatePublisher
      .addCase(updatePublisherThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // deletePublisher
      .addCase(deletePublisherThunk.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export default publisherSlice.reducer;
