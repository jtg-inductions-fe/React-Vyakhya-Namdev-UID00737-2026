import { Avatar, styled } from '@mui/material';

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(35),
    height: theme.typography.pxToRem(35),
    marginRight: theme.spacing(3),
}));
