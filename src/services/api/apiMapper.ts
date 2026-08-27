import {
    IGithubSearchApiResponse,
    IGithubUser,
    IGithubUserApiResponse,
    IGithubUserSearchResult,
} from './api.types';

/**
 * Maps a raw GitHub user API response to the application's
 * normalized GitHub user model.
 *
 * @param user - user object returned by the GitHub API.
 * @returns Normalized user object used by the application.
 */
export const IGithubUserMap = (user: IGithubUserApiResponse): IGithubUser => ({
    id: user.id,
    username: user.login,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio ?? null,
});

/**
 * Maps the raw GitHub user search response to the application's
 * normalized search result structure.
 *
 * @param response - response returned by the GitHub search API.
 * @returns Normalized search result containing the total count and users.
 */
export const IGithubUserSearchResponseMap = (
    response: IGithubSearchApiResponse,
): IGithubUserSearchResult => ({
    totalCount: response.total_count,
    users: response.items.map(IGithubUserMap),
});
