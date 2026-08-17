import { useEffect, useState } from 'react';

import SearchBox from 'components/SearchBox';
import {
    DEBOUNCE_DELAY,
    MAX_SUGGESTIONS,
    MIN_SEARCH_LENGTH,
} from 'constant/searchBoxConstants';
import { useNavigate } from 'react-router-dom';
import { useSearchUsersQuery } from 'services/api/api';

/**
 * Handles GitHub user search functionality.
 *
 * @description
 * Manages the search query, applies debouncing before triggering
 * the API request, limits the returned suggestions, and navigates
 * to the selected user's profile.
 */
const UserSearch = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    /**
     * Debounces the search query to avoid triggering an API request
     * on every keystroke.
     */
    useEffect(() => {
        const query = searchQuery.trim();

        if (query.length < MIN_SEARCH_LENGTH) {
            setDebouncedQuery('');
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isFetching, isError } = useSearchUsersQuery(debouncedQuery, {
        skip: debouncedQuery.length < MIN_SEARCH_LENGTH,
    });

    // Display only the configured maximum number of suggestions.
    const suggestions =
        searchQuery.trim().length >= MIN_SEARCH_LENGTH
            ? (data?.users.slice(0, MAX_SUGGESTIONS) ?? [])
            : [];

    return (
        <SearchBox
            onSearch={setSearchQuery}
            suggestions={suggestions}
            loading={isFetching}
            error={isError}
            onSuggestionSelect={(user) => {
                void navigate(`/users/${user.username}`);
            }}
        />
    );
};

export default UserSearch;
