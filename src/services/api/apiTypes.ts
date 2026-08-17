/**
 * Application-level GitHub user model.
 */
export interface GithubUser {
    id: number;
    username: string;
    avatarUrl: string;
    profileUrl: string;
    bio: string | null;
}

/**
 * Uses GitHub's original field names and is mapped to `GithubUser`
 * before being consumed by the application.
 */
export interface GithubUserApiResponse {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    bio?: string | null;
}

/**
 * Raw response returned by the GitHub user search API.
 */
export interface GithubSearchApiResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubUserApiResponse[];
}

/**
 * Represents the mapped structure returned by the RTK Query
 * search endpoint.
 */
export interface GithubUserSearchResult {
    totalCount: number;
    users: GithubUser[];
}
