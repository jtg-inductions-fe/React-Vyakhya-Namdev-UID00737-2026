import { typography } from 'theme/foundations';

import { styled } from '@mui/material/styles';

const { pxToRem } = typography.typographyUtil;

/**
 * Container for the hero section displayed below the header.
 */
export const HeroContainer = styled('section')({
    width: '100%',
    height: `calc(100vh - ${pxToRem(72)})`,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
});

/**
 * Displays the hero image while maintaining its aspect ratio.
 */
export const HeroImage = styled('img')({
    width: '100vw',
    height: '100%',
    display: 'block',
    objectFit: 'contain',
});
