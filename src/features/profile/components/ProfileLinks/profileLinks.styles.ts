import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/** Displays each profile link with a separator. */
export const LinkItem = styled(Box)(({ theme }) => ({
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

/** Styles the clickable profile link. */
export const LinkValue = styled('a')(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: theme.typography.body1.fontSize,

    '&:hover': {
        textDecoration: 'underline',
    },
}));

/** Centers the fallback message when no links are available. */
export const StyledTypography = styled(Typography)({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
