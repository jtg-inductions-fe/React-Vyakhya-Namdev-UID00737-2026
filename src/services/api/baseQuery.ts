import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { authStorage } from 'services/auth/authStorage';

/** Configures the base API request with authentication and GitHub headers */
export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_GITHUB_USER_API_URL,
    prepareHeaders: (headers) => {
        const token = authStorage.getToken();

        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Accept', 'application/vnd.github+json');
        headers.set('X-GitHub-Api-Version', '2026-03-10');
        return headers;
    },
});
