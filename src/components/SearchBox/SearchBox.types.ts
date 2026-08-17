import { GithubUser } from 'services/api/apiTypes';

/**
 * @prop for the GitHub user search box.
 * Supports search input, suggestions, loading/error states,
 * and user selection callbacks.
 */
export interface SearchBoxProps {
    value?: string;
    suggestions?: GithubUser[];
    loading?: boolean;
    error?: boolean;
    onSearch: (query: string) => void;
    onSuggestionSelect?: (user: GithubUser) => void;
}
