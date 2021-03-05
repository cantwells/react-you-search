import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: {
        items: []
    },
    reducers: {
        addFavourite( state, action ){
            state.items.push(action.payload);
        }
    }
})

export const { addFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;