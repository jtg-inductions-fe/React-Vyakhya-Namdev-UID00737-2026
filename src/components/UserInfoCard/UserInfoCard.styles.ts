import { typography } from 'theme/foundations';

import { SxProps, Theme } from '@mui/material';

const { pxToRem } = typography.typographyUtil;

/** Layout for the complete user information row. */
export const userInfoContainerStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
};

/** Aligns the user's avatar and profile details horizontally. */
export const userInfoDetailsStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
};

/** Defines the size and spacing of the user's avatar. */
export const avatarStyles: SxProps<Theme> = {
    width: pxToRem(32),
    height: pxToRem(32),
    mr: pxToRem(10),
};

/** Display user's bio as a block element. */
export const bioStyles: SxProps<Theme> = {
    display: 'block',
};

/** Adds spacing before the remove action. */
export const removeButtonStyles: SxProps<Theme> = {
    ml: pxToRem(1),
};
