import { createSlice } from "@reduxjs/toolkit";

// Try to load state from local storage, or use an empty array if not present
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
      state.pass = [...state.pass, action.payload];
      localStorage.setItem("passState", JSON.stringify(state.pass));
    },
    DeletePass: (state, action) => {
      state.pass = state.pass.filter((pass) => pass.id !== action.payload);
      localStorage.setItem("passState", JSON.stringify(state.pass));
    },
  },
});

export const { AddPass, DeletePass } = passSlice.actions;

export const selectPass = (state) => state.passSlice.pass;
