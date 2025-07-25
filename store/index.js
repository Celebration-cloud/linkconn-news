import { configureStore } from "@reduxjs/toolkit";
import publisherReducer from "./publisherSlice";
import articleReducer from "./articleSlice";

export const store = configureStore({
  reducer: {
    publisher: publisherReducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 👈 disable serializable value check
    }),
});
