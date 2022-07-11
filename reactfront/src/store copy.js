import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { SignInDataSlice } from './Slices/SignInDataSlice';
import { SignInPostCodeSlice } from './Slices/SignInPostCodeSlice';
import { ReadTokenSlice } from './Slices/ReadTokenSlice';
import { TabShowSlice } from './Slices/TabShowSlice'
import { SetTapItemSlice } from './Slices/SetTapItemSlice'

const logger = createLogger();

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    SignInData: SignInDataSlice.reducer,
    SignInPostCode: SignInPostCodeSlice.reducer,
    ReadToken: ReadTokenSlice.reducer,
    TabShowData: TabShowSlice.reducer,
    SetTapItemV: SetTapItemSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger, thunk],
    devTools: true
})

export const persistor = persistStore(store)
export default store;