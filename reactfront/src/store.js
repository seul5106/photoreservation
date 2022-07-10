import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { SignInDataSlice } from './Slices/SignInDataSlice';
import { SignInPostCodeSlice } from './Slices/SignInPostCodeSlice';
import { ReadTokenSlice } from './Slices/ReadTokenSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        SignInData: SignInDataSlice.reducer,
        SignInPostCode: SignInPostCodeSlice.reducer,
        ReadToken: ReadTokenSlice.reducer
    },

    middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger],
    devTools: true
})

export default store;