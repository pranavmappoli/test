import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: { isLoggedIn: false, loginHash: "" },
  reducers: {
    login(state, action) {
      state.loginHash = action.payload;
      state.isLoggedIn = true;
      console.log(state.loginHash);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loginHash = "";
    },
  },
});
export const sliceReducers = loginSlice.reducer;
export const sliceActions = loginSlice.actions;
