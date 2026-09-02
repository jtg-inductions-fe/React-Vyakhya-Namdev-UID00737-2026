export {
    githubApi,
    useSearchUsersQuery,
    useGetAuthenticatedUserQuery,
    useLazyGetAuthenticatedUserQuery,
    useGetUserQuery,
    useFollowUserMutation,
    useCheckFollowingQuery,
    useGetFollowersQuery,
} from './api';
export type {
    IGithubSearchApiResponse,
    IGithubUser,
    IGithubUserApiResponse,
    IGithubUserSearchResult,
    IFollowersQueryParams,
} from './api.types';
