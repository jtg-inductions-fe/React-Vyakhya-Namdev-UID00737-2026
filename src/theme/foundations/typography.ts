import type { Theme } from '@mui/material/styles';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';
import { FONT_WEIGHT } from '@constant';

/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,
    fontWeightLight: FONT_WEIGHT.LIGHT,
    fontWeightRegular: FONT_WEIGHT.REGULAR,
    fontWeightMedium: FONT_WEIGHT.MEDIUM,

    h1: {
        fontSize: theme.typography.pxToRem(32),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: theme.typography.pxToRem(40),

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(48),
            lineHeight: theme.typography.pxToRem(62.5),
        },
    },
    h2: {
        fontSize: theme.typography.pxToRem(28),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: theme.typography.pxToRem(36),

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(40),
            lineHeight: theme.typography.pxToRem(52),
        },
    },
    h3: {
        fontSize: theme.typography.pxToRem(24),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: theme.typography.pxToRem(32),

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(32),
            lineHeight: theme.typography.pxToRem(42),
        },
    },
    h4: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: theme.typography.pxToRem(28),

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(24),
            lineHeight: theme.typography.pxToRem(32),
        },
    },
    body1: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: theme.typography.pxToRem(24),
    },
    body2: {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: theme.typography.pxToRem(20),
    },
    caption: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: theme.typography.pxToRem(16),
    },
});

export const typography = { typographyStyle };
