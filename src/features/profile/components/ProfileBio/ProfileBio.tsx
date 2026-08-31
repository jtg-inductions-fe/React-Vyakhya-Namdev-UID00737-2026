import { PersonOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import type { IProfileBioProps } from '@features/profile/types/profile.types';

import { StyledTypography } from './profileBio.styles';

/** Displays the user's bio along with a heading. */
export const ProfileBio = ({ bio }: IProfileBioProps) => (
    <Box display="flex" flexDirection="column" gap={1} padding={1}>
        <Box display="flex" alignItems="center" gap={1}>
            <PersonOutline fontSize="small" />
            <Typography variant="h4">Bio</Typography>
        </Box>
        {bio ? (
            <Typography variant="body2" color="text.secondary">
                {bio}
            </Typography>
        ) : (
            /** Shows a fallback message when the user has no bio. */
            <StyledTypography variant="body1" color="text.secondary">
                No Bio Available!
            </StyledTypography>
        )}
    </Box>
);
