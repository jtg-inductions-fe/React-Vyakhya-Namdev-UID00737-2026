import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IGithubSearchApiResponse, IGithubUserSearchResult } from './api.types';
import { IGithubUserSearchResponseMap } from './apiMapper';

/**
 * GitHub API service configured with RTK Query.
 */
export const githubApi = createApi({
    reducerPath: 'githubApi',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_GITHUB_USER_API_URL,
    }),

    endpoints: (builder) => ({
        /**
         * Searches GitHub users by the provided search query.
         *
         * @param searchQuery - Username or search term entered by the user.
         * @returns Mapped GitHub user search results.
         */
        searchUsers: builder.query<IGithubUserSearchResult, string>({
            query: (searchQuery) => ({
                url: '/search/users',
                params: {
                    q: searchQuery,
                },
                headers: {
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2026-03-10',
                },
            }),

            /**
             * Maps the GitHub API response to the application's
             * internal user search result structure.
             */
            transformResponse: (response: IGithubSearchApiResponse) =>
                IGithubUserSearchResponseMap(response),
        }),
    }),
});

/**
 * RTK Query hook used by components to search GitHub users.
 */
export const { useSearchUsersQuery } = githubApi;
