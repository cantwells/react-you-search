import { createSlice } from "@reduxjs/toolkit";

const getIndex = (items, id) => items.findIndex( item => item.id === id );

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
            const index = getIndex( state.items, action.payload.id );
            state.items.splice( index, 1 );
        },
        editFavourite( state, action ){
            const index = getIndex( state.items, action.payload.id );
            state.items[index] =action.payload;
        }
    }
})

export const { addFavourite, delFavourite, editFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;