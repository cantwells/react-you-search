import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: {
        items: []
    },
    reducers: {
        addFavourite( state, action ){
            state.items.push(action.payload);
        },
        delFavourite( state, action ){
            const index = state.items.findIndex( item => item.id === action.payload.id );
            state.items.splice( index, 1 );
        }
    }
})

export const { addFavourite, delFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;