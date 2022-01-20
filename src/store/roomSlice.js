import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const roomSlice = createSlice({
  name: "room",
  initialState: { id: null, users: [], startGame: false },
  reducers: {
    setRoom(state, action) {
      state.id = action.payload.id;
    },
  },
  extraReducers: {},
});

export default roomSlice.reducer;
export const { setRoom } = roomSlice.actions;
