import type { Components } from '@mui/material/styles';

// Local Font files
import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import { FONT_WEIGHT } from '@constant';

//Font face declarations
const fontFaceDeclarations = `
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: ${FONT_WEIGHT.REGULAR};
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      };
    `;

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
