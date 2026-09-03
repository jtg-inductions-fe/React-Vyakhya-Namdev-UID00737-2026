import { ReactNode } from 'react';

/**
 * @prop for the GitHub user search box.
 * Supports search input, suggestions, loading/error states,
 * and user selection callbacks.
 */
export interface ISearchBoxProps<T> {
    value?: string;
    suggestions?: T[];
    loading?: boolean;
    error?: boolean;
    searchCompleted?: boolean;
    onSearch: (query: string) => void;
    onSuggestionSelect?: (item: T) => void;
    getOptionLabel: (option: T) => string;
    renderOption: (option: T) => ReactNode;
}
