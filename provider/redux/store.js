import { configureStore } from "@reduxjs/toolkit";
import { passSlice } from "./passSlice";

export const store = configureStore({
  reducer: {
    passSlice: passSlice.reducer,
  },
});
