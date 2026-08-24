import { createApi } from '@reduxjs/toolkit/query/react';

import {
    IFollowersQueryParams,
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
         * Fetches the authenticated GitHub user information
         * using the provided Personal Access Token.
         */
        getAuthenticatedUser: builder.query<IGithubUser, string>({
            query: (token) => ({
                url: '/user',
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${token}`,
                    'X-GitHub-Api-Version': '2026-03-10',
                },
            }),

            transformResponse: (response: IGithubUserApiResponse) =>
                IGithubUserMap(response),
        }),

        /** Fetches the GitHub profile details for the given username. */
        getUser: builder.query<IGithubUser, string>({
            query: (username) => ({
                url: `/users/${username}`,
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2026-03-10',
                },
            }),

            transformResponse: (
                response: IGithubUserApiResponse,
            ): IGithubUser => IGithubUserMap(response),
        }),

        /**
         * Follows the GitHub user with the given username.
         */
        followUser: builder.mutation<void, string>({
            query: (username) => ({
                url: `/user/following/${username}`,
                method: 'PUT',
            }),
        }),

        /**
         * Check for if user already follows the another user profile
         */
        checkFollowing: builder.query<boolean, string>({
            query: (username) => ({
                url: `/user/following/${username}`,
                method: 'GET',
            }),
            transformResponse: () => true,
            transformErrorResponse: (response) => {
                if (response.status === 404) {
                    return {
                        status: 404,
                        data: false,
                    };
                }

                return response;
            },
        }),

        /**
         * checking the followers of user
         */
        getFollowers: builder.query<IGithubUser[], IFollowersQueryParams>({
            query: ({ username, page, perPage }) => ({
                url: `/users/${username}/followers`,
                params: {
                    page,
                    per_page: perPage,
                },
            }),
            transformResponse: (response: IGithubUserApiResponse[]) =>
                response.map((user) => IGithubUserMap(user)),
        }),
    }),
});

/**
 * RTK Query hook used by components to search GitHub users.
 */
export const {
    useSearchUsersQuery,
    useGetAuthenticatedUserQuery,
    useLazyGetAuthenticatedUserQuery,
    useGetUserQuery,
    useFollowUserMutation,
    useCheckFollowingQuery,
    useGetFollowersQuery,
} = githubApi;
