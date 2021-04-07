import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import browserStorage from "../../browserStorage";
import helper from "../../helper";
import API from "../dal/api";

//получаем данные из localStorage
const data = browserStorage.getData('data');
//Либо декодируем в объект либо присваиваем пустой объект, которые потом передаём в качестве initialState
const persistedState = Object.keys(data).length ? JSON.parse(helper.b64_to_utf8(data)) : {};

//thunk для получения видео с сервера
export const fetchVideosByQuery = createAsyncThunk(
    'search/fetchVideosByQueries',
    async ( query ) => {
        const response = await API.fetchVideos(query);
        return response.data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    // initialState: {
    //     isLoaded: false,
    //     videos: [],
    //     totalResult: 0,
    //     request: "",
    //     isGrid: true,
    // },
    initialState: persistedState,
    reducers: {
        setIsGrid( state, action ){
            state.isGrid = action.payload;
        },
        resetVideos( state ){
            state.videos = [];
            state.totalResult = 0;
        },
        setIsLoaded( state, action ){
            state.isLoaded = action.payload;
        }
    },
    extraReducers: {
        [fetchVideosByQuery.fulfilled]: (state, action) => {
            state.videos = action.payload.items;
            state.totalResult = action.payload.pageInfo.totalResults;
            state.request = action.meta.arg.request;
            state.isLoaded = true;
        }
    }
})
export const { setIsGrid, resetVideos, setIsLoaded } = searchSlice.actions;
export default searchSlice.reducer; 
