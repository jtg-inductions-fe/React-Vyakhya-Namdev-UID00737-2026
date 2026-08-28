import {
    EditOutlined,
    GroupAdd,
    LocationOnOutlined,
    PersonAddAlt,
    SupervisorAccount,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';

import type { IProfileHeaderProps } from '@features/profile/types/profile.types';
import { authStorage } from '@services/auth/storage';

import {
    EditButton,
    ProfileActionButton,
    StatContent,
    StyledAvatar,
    StyledFollowerButton,
    StyledFollowingButton,
} from './profileHeader.styles';

/** Displays the main profile information and available actions. */
export const ProfileHeader = ({ user }: IProfileHeaderProps) => {
    const loggedInUsername = authStorage.getUser();

    /** Checks whether the logged-in user is viewing their own profile. */
    const isOwnProfile =
        loggedInUsername?.username?.toLowerCase() ===
        user.username?.toLowerCase();

    return (
        <Box display="flex" gap={12} alignItems="center">
            <StyledAvatar src={user.avatarUrl} alt={user.username} />
            <Box flexDirection="column" gap={3}>
                <Typography variant="h3">{user.name || null}</Typography>
                <Typography variant="body2" color="text.secondary">
                    @{user.username}
                </Typography>
                {user.location && (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mt={3}
                        mb={3}
                    >
                        <LocationOnOutlined fontSize="small" />
                        <Typography variant="body2">{user.location}</Typography>
                    </Box>
                )}

                <Box display="flex" mt={7} gap={8}>
                    <StatContent>
                        <Typography variant="h3">{user.following}</Typography>
                        <StyledFollowerButton variant="contained">
                            <GroupAdd />
                            <Typography variant="body1">Following</Typography>
                        </StyledFollowerButton>
                    </StatContent>
                    <Divider orientation="vertical" flexItem />
                    <StatContent>
                        <Typography variant="h3">{user.followers}</Typography>
                        <StyledFollowingButton variant="contained">
                            <SupervisorAccount />
                            <Typography variant="body1">Followers</Typography>
                        </StyledFollowingButton>
                    </StatContent>
                </Box>

                <Box display="flex" gap={5} mt={20}>
                    {isOwnProfile ? (
                        <EditButton
                            variant="outlined"
                            size="small"
                            startIcon={<EditOutlined />}
                        >
                            <Typography variant="body1">
                                Edit Profile
                            </Typography>
                        </EditButton>
                    ) : (
                        <ProfileActionButton variant="contained">
                            <PersonAddAlt />
                            <Typography variant="body1">Follow</Typography>
                        </ProfileActionButton>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
