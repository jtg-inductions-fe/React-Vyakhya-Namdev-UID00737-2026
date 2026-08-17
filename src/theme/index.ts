import { createTheme } from '@mui/material/styles';

import { SCALING_FACTOR } from '@constant';

/* Customized MUI components themes */
import { components } from './components';
/* Customized foundation themes */
import { breakpoints, mixins, palette, typography } from './foundations';

let theme = createTheme({
    breakpoints,
    palette,
    mixins,
    components,
    typography: {
        fontFamily: 'Inter',
        ...typography.typographyUtil,
    },
    spacing: (factor: number) =>
        theme.typography.pxToRem(factor * SCALING_FACTOR),
});

/* Extend the base theme with additional configurations */
theme = createTheme(theme, {
    typography: {
        ...typography.typographyStyle(theme),
    },
});

export { theme };
