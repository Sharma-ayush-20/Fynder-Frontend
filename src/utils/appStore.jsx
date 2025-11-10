import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice.jsx";
import userReducer from "./userSlice.jsx";
import feedReducer from "./feedSlice.jsx";
import connectionReducer from "./connectionSlice.jsx";
import requestReducer from "./requestSlice.jsx";

const appStore = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer
  },
});

export default appStore;
