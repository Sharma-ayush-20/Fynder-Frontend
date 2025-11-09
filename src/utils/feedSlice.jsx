import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addUserFeed: (state, action) => {
            return action.payload;
        },
        removeUserFeed: (state, action) => {
            return null;
        }
    }
})

export const { addUserFeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;