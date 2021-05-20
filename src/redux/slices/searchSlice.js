import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../dal/api";

//thunk для получения видео с сервера
export const fetchVideosByQuery = createAsyncThunk(
    'search/fetchVideosByQueries',
    async (query) => {
        try {
            const response = await API.fetchVideos(query);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoaded: false,
        videos: [],
        totalResult: 0,
        request: "",
        isGrid: true,
    },
    reducers: {
        setIsGrid(state, action) {
            state.isGrid = action.payload;
        },
        resetVideos(state) {
            state.videos = [];
            state.totalResult = 0;
            state.request = "";
            state.isGrid = true;
            state.isLoaded = false;
        },
        setLocalData(state, action) {
            state.videos = action.payload.videos;
            state.isGrid = action.payload.isGrid;
            state.request = action.payload.request;
            state.totalResult = action.payload.totalResult;
            state.isLoaded = true;
        },
    },
    extraReducers: {
        [fetchVideosByQuery.pending]: (state) => {
            state.isLoaded = false;
        },
        [fetchVideosByQuery.rejected]: (action) => {
            console.log(action);
        },
        [fetchVideosByQuery.fulfilled]: (state, action) => {
            console.log('action:', action);
            state.videos = action.payload.items;
            state.totalResult = action.payload.pageInfo.totalResults;
            state.request = action.meta.arg.request;
            state.isLoaded = true;
        }
    }
})
export const { setIsGrid, resetVideos, setIsLoaded, setLocalData } = searchSlice.actions;
export default searchSlice.reducer;