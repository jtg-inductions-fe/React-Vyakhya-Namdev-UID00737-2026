import { Avatar, Button, Link, styled } from '@mui/material';

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(35),
    height: theme.typography.pxToRem(35),
    marginRight: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary,
    width: theme.spacing(25),
    textTransform: 'capitalize',

    '&:hover': {
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
    },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,

    '&:hover': {
        textDecoration: 'underline',
    },
}));
