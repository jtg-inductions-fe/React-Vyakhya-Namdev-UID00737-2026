import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTH_TOKEN_KEY } from '@constants';
import { getCookie } from '@utils/cookie';

import { AuthState } from './auth.types';

const initialState: AuthState = {
    isAuthenticated: Boolean(getCookie(AUTH_TOKEN_KEY)),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
