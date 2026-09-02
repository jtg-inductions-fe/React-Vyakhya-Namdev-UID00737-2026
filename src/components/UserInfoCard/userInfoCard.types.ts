import { IGithubUser } from '@services/api';

/** @prop for user suggestions that to be display in card
 * Contains conditional parameter showSuggestionActions to show bio
 * and cross button in card
 */
export interface IUserSuggestion {
    user: IGithubUser;
    showSuggestionActions?: boolean;
    showFollowAction?: boolean;
    onFollow?: () => void;
    isFollowing?: boolean;
    isFollowingLoading?: boolean;
}
