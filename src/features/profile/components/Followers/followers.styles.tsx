import { Box, styled } from '@mui/material';

export const FollowerSection = styled(Box)(({ theme }) => ({
    minHeight: 'calc(100vh - 64px)',
    padding: ` ${theme.spacing(10)} ${theme.spacing(50)}`,
    backgroundColor: theme.palette.background.default,
}));

/** Implementing Card to display the followers list of user */
export const CardSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(5),
    padding: theme.spacing(10),
}));
