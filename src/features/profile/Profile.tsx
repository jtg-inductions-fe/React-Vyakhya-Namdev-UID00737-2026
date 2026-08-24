import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { Loader } from '@components/Loader';
import { ProfileBio } from '@features/profile/components/ProfileBio';
import { ProfileHeader } from '@features/profile/components/ProfileHeader';
import { ProfileLinks } from '@features/profile/components/ProfileLinks';
import { useAppDispatch } from '@hooks/redux';
import { useCheckFollowingQuery, useGetUserQuery } from '@services/api/';
import { authStorage } from '@services/auth/storage';

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

    const loggedInUser = authStorage.getUser();

    const isOwnProfile =
        loggedInUser?.username?.toLowerCase() === username?.toLowerCase();

    const shouldCheckFollowing =
        Boolean(loggedInUser) && Boolean(username) && !isOwnProfile;

    const {
        data: user,
        isLoading,
        isFetching,
        isError,
    } = useGetUserQuery(username ?? '', {
        skip: !username,
    });

    const { data: isFollowing } = useCheckFollowingQuery(username ?? '', {
        skip: !shouldCheckFollowing,
    });

    /**
     * Sets followers count received from GitHub.
     */
    useEffect(() => {
        if (user) {
            dispatch(setFollowers(user.followers));
        }
    }, [dispatch, user?.username, user?.followers]);

    /**
     * Sets follow status received from GitHub.
     */
    useEffect(() => {
        if (typeof isFollowing === 'boolean') {
            dispatch(setIsFollowing(isFollowing));
        }
    }, [dispatch, isFollowing]);

    /**
     * Reset follow state when changing profiles.
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
