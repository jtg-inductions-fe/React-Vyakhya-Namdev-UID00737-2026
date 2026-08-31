import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@features/auth/auth.slice';
import { profileReducer } from '@features/profile/profile.slice';
import { githubApi } from '@services/api';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        [githubApi.reducerPath]: githubApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
