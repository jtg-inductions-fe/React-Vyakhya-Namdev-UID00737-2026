import { typography } from 'theme/foundations';

import { styled } from '@mui/material/styles';

import { COLORS, SHADOWS } from '@constant';

const { pxToRem } = typography.typographyUtil;

/**
 * Main container for the application header.
 * Provides layout, spacing, background, and subtle shadow.
 */
export const HeaderContainer = styled('header')(({ theme }) => ({
    width: '100%',
    minHeight: pxToRem(72),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${pxToRem(24)}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 ${pxToRem(2)} ${pxToRem(8)} ${SHADOWS.HEADER}`,
    boxSizing: 'border-box',
}));

/**
 * Groups the logo and search-related elements
 * and keeps them aligned horizontally.
 */
export const SearchSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: pxToRem(15),
    flex: 1,
});

/**
 * Container for authentication actions such as
 * Login and Sign Up buttons.
 */
export const AuthSection = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: pxToRem(16),
    marginLeft: pxToRem(24),
});

/**
 * Authentication button with support for a signup variant.
 */
export const AuthButton = styled('button')<{
    variant?: 'signup';
}>(({ theme, variant }) => ({
    ...theme.typography.subtitle1,
    border: 'none',
    padding: `${pxToRem(8)} ${pxToRem(15)}`,
    borderRadius: pxToRem(8),
    cursor: 'pointer',
    backgroundColor:
        variant === 'signup' ? theme.palette.text.primary : 'transparent',
    color:
        variant === 'signup'
            ? theme.palette.background.paper
            : theme.palette.text.primary,

    '&:hover': {
        backgroundColor:
            variant === 'signup'
                ? COLORS.INTERACTION.HOVER_DARK
                : COLORS.INTERACTION.HOVER,
    },

    '&:active': {
        backgroundColor: COLORS.INTERACTION.ACTIVE,
    },

    '&:focus-visible': {
        outline: `2px solid ${COLORS.INTERACTION.FOCUS}`,
        outlineOffset: pxToRem(2),
    },
}));

/**
 * Wrapper used to align the logo vertically.
 */
export const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

/**
 * Defines the size and scaling behavior of the header logo.
 */
export const LogoImage = styled('img')({
    width: pxToRem(40),
    height: pxToRem(40),
    objectFit: 'contain',
});
