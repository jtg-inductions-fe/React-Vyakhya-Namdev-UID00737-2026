import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/** Main container for the profile page. */
export const ProfileContainer = styled(Box)(({ theme }) => ({
    minHeight: 'calc(100vh - 64px)',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.default,
}));

/** Keeps the profile content centered and within a fixed width. */
export const ProfileWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.spacing(250),
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
}));

/** Styles each separate section of the profile page. */
export const ProfileSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(5),
    padding: theme.spacing(5),
}));

/** Centers the loader while profile data is being fetched. */
export const ProfileLoader = styled(Box)({
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
});
