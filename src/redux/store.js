import { configureStore } from '@reduxjs/toolkit';
import favourites from './slices/favouriteSlice';
import search from './slices/searchSlice';
import login from './slices/loginSlice';

export default configureStore({
    reducer: {
        search,
        favourites,
        login
    }
})