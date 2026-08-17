import { useState } from 'react';

import { Loader } from 'components/Loader';
import { UserInfo } from 'components/UserInfoCard';
import { MIN_SEARCH_LENGTH } from 'constant/searchBoxConstants';
import { GithubUser } from 'services/api/apiTypes';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, IconButton, InputAdornment } from '@mui/material';

import { SearchBoxWrapper, StyledSearchInput } from './SearchBox.styles';
import { SearchBoxProps } from './SearchBox.types';

/**
 * Search input component for finding GitHub users.
 * Handles user input, autocomplete suggestions, loading/error states,
 * clearing the search, and selecting a suggested user.
 */
const SearchBox = ({
    value = '',
    suggestions = [],
    loading = false,
    error = false,
    onSearch,
    onSuggestionSelect,
}: SearchBoxProps) => {
    const [inputValue, setInputValue] = useState(value);
    const [open, setOpen] = useState(false);

    /**
     * Updates the search value and triggers the search callback.
     * Suggestions are displayed only after the minimum search length is reached.
     */
    const handleInputChange = (
        _event: React.SyntheticEvent,
        newInputValue: string,
        reason: string,
    ) => {
        if (reason === 'reset') {
            return;
        }

        setInputValue(newInputValue);
        onSearch(newInputValue);

        if (newInputValue.trim().length >= MIN_SEARCH_LENGTH) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    /**
     * Reopens suggestions when the input already contains
     * enough characters to perform a search.
     */
    const handleFocus = () => {
        if (inputValue.trim().length >= MIN_SEARCH_LENGTH) {
            setOpen(true);
        }
    };

    /** Closes the suggestion list when the input loses focus. */
    const handleBlur = () => {
        setOpen(false);
    };

    /**
     * Clears the current search value and notifies the parent
     * that the search has been reset.
     */
    const handleClear = () => {
        setInputValue('');
        setOpen(false);
        onSearch('');
    };

    /**
     * Handles selection of a GitHub user from the suggestions.
     */
    const handleSuggestionSelect = (
        _event: React.SyntheticEvent,
        user: GithubUser | null,
    ) => {
        if (user) {
            onSuggestionSelect?.(user);
        }
    };

    return (
        <SearchBoxWrapper>
            <Autocomplete<GithubUser>
                popupIcon={null}
                fullWidth
                options={suggestions}
                value={null}
                inputValue={inputValue}
                open={open}
                loading={loading}
                clearOnBlur={false}
                filterOptions={(options) => options}
                getOptionLabel={(option) => option.username}
                onInputChange={handleInputChange}
                onChange={handleSuggestionSelect}
                noOptionsText={
                    inputValue.trim().length >= MIN_SEARCH_LENGTH
                        ? 'No User Found!'
                        : ''
                }
                renderOption={(props, user) => (
                    <li {...props} key={user.id}>
                        <UserInfo user={user} />
                    </li>
                )}
                renderInput={(params) => (
                    <StyledSearchInput
                        {...params}
                        placeholder="Search GitHub Users"
                        error={error}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                                    {inputValue && (
                                        <IconButton
                                            size="small"
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                            }}
                                            onClick={handleClear}
                                            aria-label="Clear search"
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                    {loading && <Loader />}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </SearchBoxWrapper>
    );
};

export default SearchBox;
