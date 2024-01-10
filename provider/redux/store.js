// store.js

import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "@/provider/redux/passSlice"; // Import the reducer

export const store = configureStore({
  reducer: {
    passSlice: persistedReducer,
  },
});
