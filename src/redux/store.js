import { configureStore } from "@reduxjs/toolkit";
import { sliceReducers } from "./loginSlice";

const store = configureStore({
  reducer: { loginForm: sliceReducers },
});
export default store;
