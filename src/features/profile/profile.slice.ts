import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { followUser } from './profile.actions';
import type { IProfileState } from './types/profile.types';

const initialState: IProfileState = {
    followers: 0,
    followStatus: 'idle',
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
    },

    extraReducers: (builder) => {
        builder
            .addCase(followUser.pending, (state) => {
                state.followStatus = 'loading';
            })

            .addCase(followUser.fulfilled, (state) => {
                state.followStatus = 'success';
                state.isFollowing = true;
                state.followers += 1;
            })

            .addCase(followUser.rejected, (state) => {
                state.followStatus = 'error';
            });
    },
});

export const { setFollowers, setIsFollowing } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
