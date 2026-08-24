import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSearchUsersQuery } from 'services/api';
import { IGithubUser } from 'services/api';

import { SearchBox } from '@components/SearchBox';
import { UserInfo } from '@components/UserInfoCard';
import {
    DEBOUNCE_DELAY,
    MAX_SUGGESTIONS,
    MIN_QUERY_LENGTH,
} from '@features/user-search/';
/**
 * Handles GitHub user search functionality.
 *
 * @description
 * Manages the search query, applies debouncing before triggering
 * the GitHub API request, limits the returned suggestions, and
 * navigates to the selected user's profile.
 */
export const UserSearch = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const normalizedQuery = searchQuery.trim();
    const isCurrentQuery = debouncedQuery === normalizedQuery;
    /**
     * Debounces the search query to avoid triggering an API request
     * on every keystroke.
     */
    useEffect(() => {
        const query = normalizedQuery;

        if (query.length < MIN_QUERY_LENGTH) {
            setDebouncedQuery('');
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isFetching, isError } = useSearchUsersQuery(debouncedQuery, {
        skip: debouncedQuery.length < MIN_QUERY_LENGTH,
    });

    /**
     * Display only the configured maximum number of GitHub users.
     */
    const suggestions: IGithubUser[] =
        isCurrentQuery && normalizedQuery.length >= MIN_QUERY_LENGTH
            ? (data?.users.slice(0, MAX_SUGGESTIONS) ?? [])
            : [];

    /**
     * Navigates to the selected GitHub user's profile.
     */
    const handleSuggestionSelect = (user: IGithubUser) => {
        void navigate(`/profile/${user.username}`);
    };

    return (
        <SearchBox<IGithubUser>
            onSearch={setSearchQuery}
            suggestions={suggestions}
            loading={isFetching}
            error={isError}
            onSuggestionSelect={handleSuggestionSelect}
            getOptionLabel={(user: IGithubUser) => user.username}
            renderOption={(user: IGithubUser) => <UserInfo user={user} />}
        />
    );
};
