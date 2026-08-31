/**
 * Application-level GitHub user model.
 */
export interface IGithubUser {
    id: number;
    username: string;
    avatarUrl: string;
    profileUrl: string;
    bio: string | null;
    location: string | null;
    followers: number;
    following: number;
}

/**
 * Raw GitHub user response.
 */
export interface IGithubUserApiResponse {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    bio?: string | null;
    location?: string | null;
    followers: number;
    following: number;
}

/**
 * Raw response returned by the GitHub user search API.
 */
export interface IGithubSearchApiResponse {
    total_count: number;
    incomplete_results: boolean;
    items: IGithubUserApiResponse[];
}

/**
 * Represents the mapped structure returned by the RTK Query
 * search endpoint.
 */
export interface IGithubUserSearchResult {
    totalCount: number;
    users: IGithubUser[];
}
