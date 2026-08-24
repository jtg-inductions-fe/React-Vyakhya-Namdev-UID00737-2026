import { createAsyncThunk } from '@reduxjs/toolkit';

import { githubApi } from '@services/api/api';

export const followUser = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>('profile/followUser', async (username, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(
            githubApi.endpoints.followUser.initiate(username),
        ).unwrap();
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        return rejectWithValue(`Unable to follow user!: ${errorMessage}`);
    }
});
