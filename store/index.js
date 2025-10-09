import { configureStore } from "@reduxjs/toolkit";
import publisherReducer from "./publisherSlice";
import articleReducer from "./articleSlice";
import controlPanelReducer from "./controlPanelSlice";
import deviceReducer from "./deviceSlice";
import commentsReducer from "./commentsSlice";

export const store = configureStore({
  reducer: {
    publisher: publisherReducer,
    article: articleReducer,
    controlPanel: controlPanelReducer,
    comments: commentsReducer,
    devices: deviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 👈 disable serializable value check
    }),
});
