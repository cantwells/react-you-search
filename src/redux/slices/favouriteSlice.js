import { createSlice } from "@reduxjs/toolkit";

const getIndex = (items, id) => items.findIndex( item => item.id === id );

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: {
        favouriteItems: []
    },
    reducers: {
        addFavourite( state, action ){
            state.favouriteItems.push(action.payload);
        },
        delFavourite( state, action ){
            const index = getIndex( state.favouriteItems, action.payload.id );
            state.favouriteItems.splice( index, 1 );
        },
        editFavourite( state, action ){
            const index = getIndex( state.favouriteItems, action.payload.id );
            state.favouriteItems[index] = action.payload;
        },
        setLocalFavouriteItems( state, action ){
            state.favouriteItems = action.payload;
        },
        resetFavouritesItems( state ){
            state.favouriteItems = [];
        }
    }
})

export const { addFavourite, delFavourite, editFavourite, setLocalFavouriteItems, resetFavouritesItems } = favouriteSlice.actions;
export default favouriteSlice.reducer;