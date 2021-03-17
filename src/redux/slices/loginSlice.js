import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isAuthorized: false,
    },
    reducers: {
        setIsGrid( state, action ){
            state.isGrid = action.payload;
        },
        resetVideos( state, action ){
            state.videos = [];
        }
    },
})

export const { setIsGrid, resetVideos } = loginSlice.actions;
export default loginSlice.reducer;
