import { createApi } from '@reduxjs/toolkit/query/react';

import {
    IGithubSearchApiResponse,
    IGithubUser,
    IGithubUserApiResponse,
    IGithubUserSearchResult,
} from './api.types';
import { IGithubUserMap, IGithubUserSearchResponseMap } from './apiMapper';
import { baseQuery } from './baseQuery';

/**
 * GitHub API service configured with RTK Query.
 */
export const githubApi = createApi({
    reducerPath: 'githubApi',
    baseQuery,
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

        /**
         * Authenticate Github user using PAT
         */
        authenticateUser: builder.mutation<
            IGithubUser,
            {
                username: string;
                token: string;
            }
        >({
            query: ({ token }) => ({
                url: '/user',
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${token}`,
                    'X-Github-Api-Version': '2026-03-10',
                },
            }),

            transformResponse: (response: IGithubUserApiResponse) =>
                IGithubUserMap(response),
        }),
        /**
         * Fetches the latest authenticated user information.
         */
        getAuthenticatedUser: builder.query<IGithubUser, string>({
            query: (token) => ({
                url: '/user',
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${token}`,
                    'X-Github-Api-Version': '2026-03-10',
                },
            }),

            transformResponse: (response: IGithubUserApiResponse) =>
                IGithubUserMap(response),
        }),
    }),
});

/**
 * RTK Query hook used by components to search GitHub users.
 */
export const {
    useSearchUsersQuery,
    useAuthenticateUserMutation,
    useGetAuthenticatedUserQuery,
} = githubApi;
