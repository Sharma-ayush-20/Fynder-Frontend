import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice.jsx";
import userReducer from "./userSlice.jsx";
import feedReducer from "./feedSlice.jsx";

const appStore = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
