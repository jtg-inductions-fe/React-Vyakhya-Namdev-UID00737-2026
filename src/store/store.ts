import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@features/auth/auth.slice';
import { githubApi } from '@services/api';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
