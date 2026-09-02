import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { Loader } from '@components/Loader';
import { ProfileBio } from '@features/profile/components/ProfileBio';
import { ProfileHeader } from '@features/profile/components/ProfileHeader';
import { ProfileLinks } from '@features/profile/components/ProfileLinks';
import { useAuth } from '@hooks/useAuth';
import { useCheckFollowingQuery, useGetUserQuery } from '@services/api';
import { useAppDispatch } from '@store';

import { setFollowers, setIsFollowing } from './profile.slice';
import {
    ProfileContainer,
    ProfileLoader,
    ProfileSection,
    ProfileWrapper,
} from './profile.styles';

/** Loads and displays the profile page for the username in the URL. */
export const Profile = () => {
    const { username } = useParams<{ username: string }>();

    const dispatch = useAppDispatch();
    const { user: authenticatedUser, isAuthenticated } = useAuth();

    /** Checks whether the logged-in user is viewing their own profile. */
    const isOwnProfile =
        authenticatedUser?.username?.toLowerCase() === username?.toLowerCase();

    /** Determines whether the follow status should be checked. */
    const shouldCheckFollowing =
        isAuthenticated && Boolean(username) && !isOwnProfile;

    /**
     * Uses currentData so only the data for the current username is used.
     * This prevents previous profile data from being used while a new
     * username request is pending.
     */
    const {
        currentData: user,
        isLoading,
        isFetching,
        isError,
    } = useGetUserQuery(username ?? skipToken);

    /**
     * Uses currentData to prevent dispatching the previous user's
     * follow status when the username changes.
     */
    const { currentData: isFollowing } = useCheckFollowingQuery(
        shouldCheckFollowing && username ? username : skipToken,
    );

    /**
     * Sets followers count received from GitHub for the current profile.
     */
    useEffect(() => {
        if (user) {
            dispatch(setFollowers(user.followers));
        }
    }, [dispatch, user?.username, user?.followers]);

    /**
     * Sets follow status received from GitHub for the current profile.
     */
    useEffect(() => {
        if (typeof isFollowing === 'boolean') {
            dispatch(setIsFollowing(isFollowing));
        }
    }, [dispatch, isFollowing]);

    /**
     * Resets follow state when viewing own profile or when logged out.
     */
    useEffect(() => {
        if (!shouldCheckFollowing) {
            dispatch(setIsFollowing(false));
        }
    }, [dispatch, shouldCheckFollowing, username]);

    if (isLoading || isFetching) {
        return (
            <ProfileContainer>
                <ProfileLoader>
                    <Loader />
                </ProfileLoader>
            </ProfileContainer>
        );
    }

    if (isError || !user) {
        return <Box>Unable to load profile!</Box>;
    }

    return (
        <ProfileContainer>
            <ProfileWrapper>
                <ProfileSection>
                    <ProfileHeader user={user} />
                </ProfileSection>

                <ProfileSection>
                    <ProfileBio bio={user.bio} />
                </ProfileSection>

                <ProfileSection>
                    <ProfileLinks
                        githubUrl={user.githubUrl}
                        blog={user.blog}
                        email={user.email}
                    />
                </ProfileSection>
            </ProfileWrapper>
        </ProfileContainer>
    );
};
