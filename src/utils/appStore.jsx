import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice.jsx";
import userReducer from "./userSlice.jsx";

const appStore = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export default appStore;
