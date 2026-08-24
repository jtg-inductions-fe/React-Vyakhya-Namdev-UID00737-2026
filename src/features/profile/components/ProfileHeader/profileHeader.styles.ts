import { Link as RouterLink } from 'react-router-dom';

import { Avatar, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

/** Sets the size of the user's profile image. */
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(325),
    height: theme.typography.pxToRem(325),
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: '0 0 0 4px rgba(150, 138, 138, 0.15)',
}));

/** Arranges each profile statistic with its value and label. */
export const StatContent = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
});

/** Styles the follow button using the theme colors. */
export const ProfileActionButton = styled(Button)(({ theme }) => ({
    gap: theme.spacing(2),
    backgroundColor: theme.palette.success.main,
    color: theme.palette.background.default,
    width: theme.typography.pxToRem(120),
    textTransform: 'capitalize',
}));

/** Styles the edit button using the theme colors. */
export const StyledButton = styled(Button)(({ theme }) => ({
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary,
    width: theme.typography.pxToRem(150),
    textTransform: 'capitalize',

    '&:hover': {
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
    },
}));

/** Styling the following/followers link */
export const StyledLink = styled(RouterLink)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.secondary,

    '&:hover': {
        color: theme.palette.text.primary,
        textDecoration: 'underline',
    },
}));
