import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';
import { FONT_WEIGHT } from '@constant';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,
    fontWeightLight: FONT_WEIGHT.LIGHT,
    fontWeightRegular: FONT_WEIGHT.REGULAR,
    fontWeightMedium: FONT_WEIGHT.MEDIUM,

    h1: {
        fontSize: typographyUtil.pxToRem(32),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: typographyUtil.pxToRem(40),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(48),
            lineHeight: typographyUtil.pxToRem(62.5),
        },
    },
    h2: {
        fontSize: typographyUtil.pxToRem(28),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: typographyUtil.pxToRem(36),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(40),
            lineHeight: typographyUtil.pxToRem(52),
        },
    },
    h3: {
        fontSize: typographyUtil.pxToRem(24),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: typographyUtil.pxToRem(32),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(32),
            lineHeight: typographyUtil.pxToRem(42),
        },
    },
    h4: {
        fontSize: typographyUtil.pxToRem(20),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: typographyUtil.pxToRem(28),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(24),
            lineHeight: typographyUtil.pxToRem(32),
        },
    },
    body1: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: typographyUtil.pxToRem(24),
    },
    body2: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: typographyUtil.pxToRem(20),
    },
    caption: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: typographyUtil.pxToRem(16),
    },
});

export const typography = { typographyStyle, typographyUtil };
