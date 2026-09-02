import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '../../constants';

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
    success: {
        main: COLORS.STATUS.SUCCESS,
    },
    error: {
        main: COLORS.STATUS.ERROR,
    },
    warning: {
        main: COLORS.STATUS.WARNING,
    },
    interaction: {
        hover: COLORS.INTERACTION.HOVER,
        hoverDark: COLORS.INTERACTION.HOVER_DARK,
        active: COLORS.INTERACTION.ACTIVE,
        focus: COLORS.INTERACTION.FOCUS,
        disabled: COLORS.INTERACTION.DISABLED,
    },
};
