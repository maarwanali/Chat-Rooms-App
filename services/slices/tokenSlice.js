import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },

    logOut: (state, action) => {
      state.accessToken = "";
    },
  },
});

export const { setToken, logOut } = tokenSlice.actions;

export const selectAccessToken = (state) => state.token.accessToken;

export default tokenSlice.reducer;
