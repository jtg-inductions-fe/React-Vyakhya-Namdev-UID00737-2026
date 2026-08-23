import {
    Box,
    Button,
    buttonClasses,
    Menu,
    MenuItem,
    paperClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Main container for the application header.
 * Provides layout, spacing, background, and subtle shadow.
 */
export const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: theme.typography.pxToRem(72),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(8)}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.customShadows.header,
    boxSizing: 'border-box',
}));

/**
 * Authentication button with support for a signup variant.
 */
export const AuthButton = styled(Button)(({ theme }) => ({
    ...theme.typography.subtitle1,
    border: 'none',
    textTransform: 'capitalize',
    padding: `${theme.spacing(2)} ${theme.spacing(6)}`,
    borderRadius: theme.typography.pxToRem(8),
    cursor: 'pointer',

    [`&.${buttonClasses.contained}`]: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.background.paper,

        '&:hover': {
            backgroundColor: theme.palette.interaction.hoverDark,
        },
    },

    [`&.${buttonClasses.text}`]: {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,

        '&:hover': {
            backgroundColor: theme.palette.interaction.hover,
        },
    },

    '&:active': {
        backgroundColor: theme.palette.interaction.active,
    },

    '&:focus-visible': {
        outline: `2px solid ${theme.palette.interaction.focus}`,
        outlineOffset: theme.typography.pxToRem(2),
    },
}));

/**
 * Styling the ProfileButton
 */
export const ProfileButton = styled('button')(({ theme }) => ({
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    width: theme.spacing(12),
    height: theme.spacing(12),
    padding: 0,
    margin: 0,
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: theme.palette.interaction.hover,
    },

    '&:focus-visible': {
        outline: `2px solid ${theme.palette.interaction.focus}`,
        outlineOffset: theme.spacing(2),
    },
}));

/** Styled Menu Items in flexed-row direction along with icons */
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

/** Kept ProfileMenu at distance from Profile Button */
export const ProfileMenu = styled(Menu)(({ theme }) => ({
    [`& .${paperClasses.root}`]: {
        marginTop: theme.spacing(2),
        minWidth: theme.spacing(15),
    },
}));
