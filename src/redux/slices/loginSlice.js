import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import browserStorage from "../../browserStorage";
import helper from "../../helper";
import API from "../dal/api";

//thunk для проверки авторизационных данных
export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async ( credentials ) => {
        try{
            //Получаем объект с разрешенными учётными данными
            const response = await API.getUsers();
            const users = response.users;
            //Передаем учётные данные возвращенные из формы и разрешенные учётные данные для проверки
            //авторизации
            return await helper.logIn(credentials, users);
        }catch(err){
            throw err;
        }
    }
)

//получаем данные из localStorage
const data = browserStorage.getData('token');
//Либо сохраняем в десериализованный объект либо присваиваем пустой объект,
// которые потом передаём в качестве initialState
const persistedState = Object.keys(data).length ? data : {};

const loginSlice = createSlice({
    name: 'login',
    // initialState: {
    //     isAuthorized: false,
    //     user: {},
    //     error: "",
    // },
    initialState: persistedState,
    reducers: {
        setAuthorized( state, action ){
            state.isAuthorized = action.payload.isAuthorized;
        },
        logOut(state){
            state.isAuthorized = false;
            state.user = {}
        },
        resetError( state ){
            state.error = ""
        }
    },
    extraReducers: {
        [fetchLogin.fulfilled]: ( state, action ) => {
            state.isAuthorized = true;
            state.user = action.payload;
            state.error = "";
        },
        [fetchLogin.rejected]: ( state, action ) => {
            state.error = action.error.message;
        },
    }
})

export const { setAuthorized, logOut, resetError } = loginSlice.actions;
export default loginSlice.reducer;
