import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';

import storage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';

import { SignInDataSlice } from './Slices/SignInDataSlice';
import { SignInPostCodeSlice } from './Slices/SignInPostCodeSlice';
import { ReadTokenSlice } from './Slices/ReadTokenSlice';
import { TabShowSlice } from './Slices/TabShowSlice'
import { SetTapItemSlice } from './Slices/SetTapItemSlice'

// const logger = createLogger();

//https://velog.io/@hongdol/redux-toolkit%EC%A0%81%EC%9A%A9%EA%B3%BC-persist-%EC%A0%81%EC%9A%A9
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ["SignInData","SignInPostCode"]
  };

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

    middleware: [...getDefaultMiddleware({ serializableCheck: false }),  ],
    devTools: true
})

export const persistor = persistStore(store)
export default store;