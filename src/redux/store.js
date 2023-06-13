import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
import authReducer from './authRedux';
import orderReducer from './orderRedux';
import temporaryReducer from './temporaryRedux';
import addressReducer from './addressRedux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    temporary: temporaryReducer,
    order: orderReducer,
    address: addressReducer,
    // auth: {
    //     authReducer,
    //     cart: cartReducer,
    // },
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
