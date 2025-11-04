import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice.jsx";

const appStore = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default appStore;
