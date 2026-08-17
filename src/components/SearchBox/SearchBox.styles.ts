import { typography } from 'theme/foundations';

import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const pxToRem = typography.typographyUtil.pxToRem;

/**
 * Wrapper for the user search field and its autocomplete dropdown.
 * Controls the search field width and dropdown height.
 */
export const SearchBoxWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: pxToRem(400),

    '& .MuiOutlinedInput-root': {
        height: pxToRem(44),
        borderRadius: theme.shape.borderRadius,
    },

    '& .MuiAutocomplete-paper': {
        maxHeight: pxToRem(400),
    },
}));

/**
 * Base styled TextField used as the search input.
 */
export const StyledSearchInput = styled(TextField)(() => ({}));
