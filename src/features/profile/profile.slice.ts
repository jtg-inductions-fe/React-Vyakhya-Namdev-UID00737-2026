import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IProfileState } from './types/profile.types';

const initialState: IProfileState = {
    followers: 0,
    isFollowing: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,

    reducers: {
        setFollowers: (state, action: PayloadAction<number>) => {
            state.followers = action.payload;
        },

        setIsFollowing: (state, action: PayloadAction<boolean>) => {
            state.isFollowing = action.payload;
        },

        followUserSuccess: (state) => {
            state.isFollowing = true;
            state.followers += 1;
        },
    },
});

export const { setFollowers, setIsFollowing, followUserSuccess } =
    profileSlice.actions;

export const profileReducer = profileSlice.reducer;
