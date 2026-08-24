import { Box, Button, styled } from '@mui/material';

export const ErrorContainer = styled(Box)(({ theme }) => ({
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    textAlign: 'center',
}));

export const HomeButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.text.primary,
    colors: theme.palette.background.paper,
}));
