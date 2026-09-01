export declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        lineClamp: (lines: number) => CSSProperties;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        interaction: {
            hover: string;
            hoverDark: string;
            hover_button: string;
            active: string;
            focus: string;
            disabled: string;
        };

        customShadows: {
            header: string;
            form: string;
            avatar: string;
        };

        customColors: {
            button_text_primary: string;
            button_text_secondary: string;
        };
    }

    interface PaletteOptions {
        interaction?: {
            hover?: string;
            hoverDark?: string;
            hover_button?: string;
            active?: string;
            focus?: string;
            disabled?: string;
        };

        customShadows?: {
            header?: string;
            form?: string;
            avatar?: string;
        };

        customColors: {
            button_text_primary?: string;
            button_text_secondary?: string;
        };
    }
}
