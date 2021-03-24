import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isAuthorized: false,
    },
    reducers: {
        setAuthorized( state, action ){
            state.isAuthorized = action.payload.isAuthorized;
        },
        logOut(state, action){
            state.isAuthorized = false;
        }
    },
})

export const { setAuthorized, logOut } = loginSlice.actions;
export default loginSlice.reducer;
