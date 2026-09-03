import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    EditOutlined,
    HowToReg,
    LocationOnOutlined,
    PersonAddAlt,
} from '@mui/icons-material';
import { Box, Divider, Snackbar, Typography } from '@mui/material';

import defaultAvatar from '@assets/image/default-avatar.jpg';
import { useAuth } from '@hooks/useAuth';
import { useFollowUserMutation } from '@services/api';
import { useAppDispatch, useAppSelector } from '@store';
import { formatNumber } from '@utils/formatNumber';

import {
    ProfileActionButton,
    StatContent,
    StyledAvatar,
    StyledButton,
    StyledLink,
} from './profileHeader.styles';
import { followUserSuccess } from '../../profile.slice';
import type { IProfileHeaderProps } from '../../types/profile.types';

export const ProfileHeader = ({ user }: IProfileHeaderProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user: authenticatedUser, isAuthenticated } = useAuth();

    const { followers, isFollowing } = useAppSelector((state) => state.profile);

    const [followUser, { isLoading: isFollowLoading }] =
        useFollowUserMutation();
    const [message, setMessage] = useState('');

    const isOwnProfile =
        authenticatedUser?.username?.toLowerCase() ===
        user.username?.toLowerCase();

    const shouldShowEditButton = isAuthenticated && isOwnProfile;

    const handleFollow = async () => {
        if (!isAuthenticated) {
            void navigate('/login');
            return;
        }

        if (isFollowing || isFollowLoading) {
            return;
        }

        try {
            await followUser(user.username).unwrap();

            dispatch(followUserSuccess());
            setMessage('Successfully followed user!');
        } catch {
            setMessage('Unable to follow user, Please try again!');
        }
    };

    return (
        <>
            <Box display="flex" gap={12} alignItems="center">
                <StyledAvatar
                    src={user.avatarUrl || defaultAvatar}
                    alt={user.username}
                />

                <Box flexDirection="column" gap={5}>
                    <Typography variant="h3">{user.name || null}</Typography>

                    <Typography variant="body2" color="text.secondary">
                        @{user.username}
                    </Typography>

                    {user.location && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <LocationOnOutlined fontSize="small" />

                            <Typography variant="body2">
                                {user.location}
                            </Typography>
                        </Box>
                    )}

                    <Box display="flex" mt={5} gap={8}>
                        <StatContent>
                            <Typography variant="h4">
                                {formatNumber(user.following) ?? 0}
                            </Typography>

                            <StyledLink
                                to={`/profile/${user.username}/following`}
                            >
                                <Typography variant="body1">
                                    Following
                                </Typography>
                            </StyledLink>
                        </StatContent>

                        <Divider orientation="vertical" flexItem />

                        <StatContent>
                            <Typography variant="h4">
                                {formatNumber(followers) ?? 0}
                            </Typography>

                            <StyledLink
                                to={`/profile/${user.username}/followers`}
                            >
                                <Typography variant="body1">
                                    Followers
                                </Typography>
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
                        ) : isFollowing ? (
                            <StyledButton variant="outlined">
                                <HowToReg />

                                <Typography variant="body1">
                                    Unfollow
                                </Typography>
                            </StyledButton>
                        ) : (
                            <ProfileActionButton
                                variant="contained"
                                onClick={() => {
                                    void handleFollow();
                                }}
                                disabled={isFollowLoading}
                            >
                                <PersonAddAlt />

                                <Typography variant="body1">
                                    {isFollowLoading
                                        ? 'Following...'
                                        : 'Follow'}
                                </Typography>
                            </ProfileActionButton>
                        )}
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={Boolean(message)}
                autoHideDuration={3000}
                message={message}
                onClose={() => setMessage('')}
            />
        </>
    );
};
