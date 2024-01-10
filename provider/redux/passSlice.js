// passSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("passState");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from local storage:", err);
    return [];
  }
};

const initialState = {
  pass: loadState(),
};

export const passSlice = createSlice({
  name: "pass-saver",
  initialState,
  reducers: {
    AddPass: (state, action) => {
      const newItem = {
        id: uuidv4(),
        ...action.payload,
      };
      state.pass = [...state.pass, newItem];
      localStorage.setItem("passState", JSON.stringify(state.pass));
    },
    DeletePass: (state, action) => {
      state.pass = state.pass.filter((pass) => pass.id !== action.payload);
      localStorage.setItem("passState", JSON.stringify(state.pass));
    },
    updatePasses: (state, action) => {
      state.pass = action.payload;
      localStorage.setItem("passState", JSON.stringify(state.pass));
    },
  },
});

export const { AddPass, DeletePass, updatePasses } = passSlice.actions;

export default passSlice.reducer;
