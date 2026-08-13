import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
    },
    background: {
        default: COLORS.BACKGROUND.DEFAULT,
        paper: COLORS.BACKGROUND.CARD,
    },
    grey: {
        500: COLORS.GREY.BORDER,
        300: COLORS.GREY.MUTED,
    },
};
