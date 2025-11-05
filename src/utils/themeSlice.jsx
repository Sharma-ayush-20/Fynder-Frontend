import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: initialTheme,
  },
  reducers: {
    toggleTheme: (state, actions) => {
      state.value = state.value === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
