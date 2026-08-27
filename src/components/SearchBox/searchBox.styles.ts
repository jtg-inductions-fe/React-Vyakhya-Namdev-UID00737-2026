import {
    autocompleteClasses,
    Box,
    outlinedInputClasses,
    Popper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Wrapper for the user search field and its autocomplete dropdown.
 * Controls the search field width and dropdown height.
 */
export const SearchBoxWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.typography.pxToRem(400),

    [`& .${outlinedInputClasses.root}`]: {
        height: theme.typography.pxToRem(45),
        borderRadius: theme.shape.borderRadius,
    },
}));

export const SearchBoxPopper = styled(Popper)(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        maxHeight: theme.typography.pxToRem(400),
    },
}));
