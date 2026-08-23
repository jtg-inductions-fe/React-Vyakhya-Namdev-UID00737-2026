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
            active: string;
            focus: string;
            disabled: string;
        };

        customShadows: {
            header: string;
            form: string;
        };
    }

    interface PaletteOptions {
        interaction?: {
            hover?: string;
            hoverDark?: string;
            active?: string;
            focus?: string;
            disabled?: string;
        };

        customShadows?: {
            header?: string;
        };
    }
}
