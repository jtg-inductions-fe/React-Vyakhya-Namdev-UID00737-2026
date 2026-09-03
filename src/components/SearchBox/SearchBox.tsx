import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
    Autocomplete,
    IconButton,
    InputAdornment,
    ListItem,
    TextField,
} from '@mui/material';

import { Loader } from '@components/Loader';
import { MIN_QUERY_LENGTH } from '@features/user-search/userSearch.constants';

import { SearchBoxPopper, SearchBoxWrapper } from './searchBox.styles';
import { ISearchBoxProps } from './searchBox.types';

/**
 * Generic reusable search box with autocomplete functionality.
 *
 * The component is independent of the type of data being searched.
 * The parent component provides:
 * - how to get the option label
 * - how to render each suggestion
 * - what to do when a suggestion is selected
 */
export const SearchBox = <T,>({
    value = '',
    suggestions = [],
    loading = false,
    error = false,
    searchCompleted = false,
    onSearch,
    onSuggestionSelect,
    getOptionLabel,
    renderOption,
}: ISearchBoxProps<T>) => {
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

        if (newInputValue.trim().length >= MIN_QUERY_LENGTH) {
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
        if (inputValue.trim().length >= MIN_QUERY_LENGTH) {
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
     * Handles selection of an item from the suggestions.
     */
    const handleSuggestionSelect = (
        _event: React.SyntheticEvent,
        item: T | null,
    ) => {
        if (item) {
            onSuggestionSelect?.(item);
        }
    };

    return (
        <SearchBoxWrapper>
            <Autocomplete<T>
                slots={{ popper: SearchBoxPopper }}
                popupIcon={null}
                fullWidth
                options={suggestions}
                value={null}
                inputValue={inputValue}
                open={open}
                onClose={() => setOpen(false)}
                loading={loading}
                clearOnBlur={false}
                filterOptions={(options) => options}
                getOptionLabel={getOptionLabel}
                onInputChange={handleInputChange}
                onChange={handleSuggestionSelect}
                noOptionsText={
                    searchCompleted &&
                    !loading &&
                    inputValue.trim().length >= MIN_QUERY_LENGTH &&
                    suggestions.length === 0
                        ? 'No Result Found!'
                        : ''
                }
                renderOption={(props, item) => (
                    <ListItem {...props}>{renderOption(item)}</ListItem>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
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
