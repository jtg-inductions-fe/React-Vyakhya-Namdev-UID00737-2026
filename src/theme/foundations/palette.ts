import type { PaletteOptions } from '@mui/material/styles';

import { COLORS, SHADOWS } from '../../constants';

/* Custom Palette */
export const palette: PaletteOptions & {
    customShadows: {
        header: typeof SHADOWS.HEADER;
        form: typeof SHADOWS.FORM;
        avatar: typeof SHADOWS.AVATAR;
    };
} = {
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
        hover_button: COLORS.INTERACTION.HOVER_BUTTON,
        hover_follow_button: COLORS.INTERACTION.HOVER_FOLLOW_BUTTON,
        active: COLORS.INTERACTION.ACTIVE,
        focus: COLORS.INTERACTION.FOCUS,
        disabled: COLORS.INTERACTION.DISABLED,
    },
    customShadows: {
        header: SHADOWS.HEADER,
        form: SHADOWS.FORM,
        avatar: SHADOWS.AVATAR,
    },
    customColors: {
        button_text_primary: COLORS.TEXT.BUTTON,
        button_text_secondary: COLORS.TEXT.TERTIARY,
        button_primary: COLORS.BACKGROUND.BUTTON_PRIMARY,
        button_secondary: COLORS.BACKGROUND.BUTTON_SECONDARY,
    },
};
