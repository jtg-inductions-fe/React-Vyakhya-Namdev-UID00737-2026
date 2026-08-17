import { GithubUser } from 'services/api/apiTypes';

/** @prop for user suggestions that to be display in card
 * Contains conditional parameter showSuggestionActions to show bio
 * and cross button in card
 */
export interface UserSuggestionProps {
    user: GithubUser;
    showSuggestionActions?: boolean;
}
