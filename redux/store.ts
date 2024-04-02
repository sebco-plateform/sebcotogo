import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import cartSlice from "@/redux/features/cart-slice";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartSlice,
});

const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer : {
        authReducer,
        cartSlice,
    }
})
// Créer le persisteur Redux
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
