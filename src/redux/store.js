import { configureStore } from '@reduxjs/toolkit';
import favourites from './slices/favouriteSlice';
import search from './slices/searchSlice';
import login from './slices/loginSlice';
import browserStorage from '../browserStorage';
// import helper from '../helper';

const store = configureStore({
    reducer: {
        search,
        favourites,
        login
    }
})

store.subscribe( () => {
    if( store.getState().login.isAuthorized ){
        // const serializedData = helper.utf8_to_b64(JSON.stringify(store.getState().login));
        // browserStorage.saveData('token', serializedData);
        const serializedData = JSON.stringify(store.getState().login);
        browserStorage.saveData('token', serializedData);
        // const serializedDataSearch = helper.utf8_to_b64(JSON.stringify(store.getState().search));
        // browserStorage.saveData('data', serializedDataSearch);
        const serializedDataSearch = JSON.stringify(store.getState().search);
        browserStorage.saveData('data', serializedDataSearch);
    }
} )

export default store;