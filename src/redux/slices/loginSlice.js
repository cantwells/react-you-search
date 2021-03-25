import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import helper from "../../helper";

export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async ( credentials, thunkAPI ) => {
        try{
            return await helper.logIn(credentials);
        }catch(err){
            throw err;
        }
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isAuthorized: false,
        error: "",
    },
    reducers: {
        setAuthorized( state, action ){
            state.isAuthorized = action.payload.isAuthorized;
        },
        logOut(state){
            state.isAuthorized = false;
        },
        resetError( state ){
            state.error = ""
        }
    },
    extraReducers: {
        [fetchLogin.fulfilled]: ( state ) => {
            state.isAuthorized = true;
            state.error = "";
        },
        [fetchLogin.rejected]: ( state, action ) => {
            state.error = action.error.message;
        }
    }
})

export const { setAuthorized, logOut, resetError } = loginSlice.actions;
export default loginSlice.reducer;
