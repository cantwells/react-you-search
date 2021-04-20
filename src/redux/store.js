import { configureStore } from '@reduxjs/toolkit';
import favourites from './slices/favouriteSlice';
import search from './slices/searchSlice';
import login from './slices/loginSlice';
import browserStorage from '../browserStorage';

const store = configureStore({
    reducer: {
        search,
        favourites,
        login
    }
})
//Работаем с localStorage
store.subscribe( () => {
    //Если пользователь авторизировался сохраняем его учётные данные в localStorage
    if( store.getState().login.isAuthorized ){
        browserStorage.saveData('token', store.getState().login);
    }
    //Если загружаются новые данные, то сохраняем их в localStorage
    if( store.getState().search?.isLoaded ){
        //Определяем под каким пользователем залогинены
        const user = store.getState().login.user;
        //Получаем данные поисковый запросов из состояния 
        const search = store.getState().search;
        //Получаем данные об избранных запросах из состояния
        const favourites = store.getState().favourites;
        //Делаем общий объект с данными и закидываем в localStorage, ключем является имя пользователя
        const allData = Object.assign( {}, search, favourites );
        browserStorage.saveData([user], allData);
    }
} )

export default store;