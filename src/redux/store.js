import { configureStore } from '@reduxjs/toolkit';
import favouriteSlice from './slices/favouriteSlice';
import searchSlice from './slices/searchSlice';

export default configureStore({
    reducer: {
        search: searchSlice,
        favourites: favouriteSlice
    }
})