import { useNavigate } from 'react-router-dom';

import {
    EditOutlined,
    HowToReg,
    LocationOnOutlined,
    PersonAddAlt,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';

import { followUser } from '@features/profile/profile.actions';
import { useAuth } from '@hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@hooks/redux';

import {
    ProfileActionButton,
    StatContent,
    StyledAvatar,
    StyledLink,
    StyledButton
} from './profileHeader.styles';
import type { IProfileHeaderProps } from '../../types/profile.types';

/** Displays the main profile information and available actions. */
export const ProfileHeader = ({ user }: IProfileHeaderProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user: authenticatedUser, isAuthenticated } = useAuth();

    const { followers, followStatus, isFollowing } = useAppSelector(
        (state) => state.profile,
    );

    /** Checks whether the logged-in user is viewing their own profile. */
    const isOwnProfile =
        authenticatedUser?.username?.toLowerCase() ===
        user.username?.toLowerCase();

    const handleFollowClick = () => {
        if (!authenticatedUser) {
            void navigate('/login');
            return;
        }
    const shouldShowEditButton = isAuthenticated && isOwnProfile;

    /** Checks whether the follow API request is in progress. */
    const isFollowLoading = followStatus === 'loading';

    /** Follows the currently viewed user. */
    const handleFollow = () => {
        if (!isAuthenticated) {
            void navigate('/login');
            return;
        }

        if (isFollowing || isFollowLoading) {
            return;
        }

        void dispatch(followUser(user.username));
    };

    /** Navigates to the followers list of the current profile. */
    const handleFollowersClick = () => {
        void navigate(`/profile/${user.username}/followers`);
    };

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

                        <Typography variant="body2">
                            {user.location}
                        </Typography>
                    </Box>
                )}

                <Box display="flex" mt={7} gap={8}>
                    <StatContent>
                        <Typography variant="h4">{user.following}</Typography>
                        <StyledLink to={`/profile/${user.username}/following`}>
                            <Typography variant="body1">Following</Typography>
                        </StyledLink>
                    </StatContent>

                    <Divider orientation="vertical" flexItem />

                    <StatContent>
                        <Typography variant="h4">{user.followers}</Typography>
                        <StyledLink to={`/profile/${user.username}/followers`}>
                            <Typography variant="body1">Followers</Typography>
                        </StyledLink>
                    </StatContent>
                </Box>

                <Box display="flex" gap={5} mt={10}>
                    {shouldShowEditButton ? (
                        <StyledButton
                            variant="outlined"
                            size="small"
                            startIcon={<EditOutlined />}
                        >
                            <Typography variant="body1">
                                Edit Profile
                            </Typography>
                        </StyledButton>
                    ) : (
                        isAuthenticated &&
                        (isFollowing ? (
                            <StyledButton variant="outlined">
                                <HowToReg />

                                <Typography variant="body1">
                                    Following
                                </Typography>
                            </StyledButton>
                        ) : (
                            <ProfileActionButton
                                variant="contained"
                                onClick={handleFollow}
                                disabled={isFollowLoading}
                            >
                                <PersonAddAlt />

                                <Typography variant="body1">
                                    {isFollowLoading
                                        ? 'Unfollow'
                                        : 'Follow'}
                                </Typography>
                            </ProfileActionButton>
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    );
};
};