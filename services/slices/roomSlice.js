import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomid: "",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomid = action.payload.roomid;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export const selectRoomid = (state) => state.room.roomid;

export default roomSlice.reducer;
