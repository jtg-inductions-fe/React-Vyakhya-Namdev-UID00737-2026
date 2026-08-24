/**
 * Application-level GitHub user model.
 */
export interface IGithubUser {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
    profileUrl: string;
    bio: string | null;
    location: string | null;
    followers: number;
    following: number;
    githubUrl: string;
    blog: string | null;
    email: string | null;
}

/**
 * Raw GitHub user response.
 */
export interface IGithubUserApiResponse {
    id: number;
    name: string;
    login: string;
    avatar_url: string;
    html_url: string;
    bio?: string | null;
    location?: string | null;
    followers: number;
    following: number;
    githubUrl: string;
    blog: string | null;
    email: string | null;
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
