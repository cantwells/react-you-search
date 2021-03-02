import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../dal/api";

//create thunk
export const fetchVideosByQuery = createAsyncThunk(
    'search/fetchVideosByQueries',
    async ( query ) => {
        const response = await API.fetchVideos(query);
        return response.data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoaded: false,
        videos: [],
        totalResult: 0,
        isGrid: true,
    },
    reducers: {
        setIsGrid( state, action ){
            state.isGrid = action.payload;
        }
    },
    extraReducers: {
        [fetchVideosByQuery.fulfilled]: (state, action) => {
            state.videos = action.payload.items;
            state.totalResult = action.payload.pageInfo.totalResults;

        }
    }
})
export const { setIsGrid } = searchSlice.actions;
export default searchSlice.reducer; 
