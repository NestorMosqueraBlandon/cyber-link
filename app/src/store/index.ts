import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth'
import {persistStore, persistReducer} from 'redux-persist'
import cartReducer from './features/cart/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
    reducer:{
        auth: persistedAuthReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
}) 

export const persistor = persistStore(store) 