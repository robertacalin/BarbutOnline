import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { uid: null, displayName: null, photoURL: null, logged: false },
  reducers: {
    setUser(state, action) {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.logged = true;
      console.log(action.payload);
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
