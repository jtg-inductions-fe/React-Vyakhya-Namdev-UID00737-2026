import type { Components } from '@mui/material/styles';

import { CSSObject } from '@emotion/react';

// Local Font files
import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import { FONT_WEIGHT } from '@constants';

//Font face declarations
const fontFaceDeclarations: CSSObject = {
    '@font-face': {
        fontDisplay: 'swap',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: FONT_WEIGHT.REGULAR,
        src: `url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype')`,
    },
};

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '100%',
            },
            fontFaceDeclarations,
        },
    },
};
