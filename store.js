import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./services/slices/tokenSlice";
import userSlice from "./services/slices/userSlice";
import roomSlice from "./services/slices/roomSlice";

import { apiSlice } from "./services/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    token: tokenSlice,
    user: userSlice,
    room: roomSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
