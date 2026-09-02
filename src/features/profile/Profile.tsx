import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { Loader } from '@components/Loader';
import { ProfileBio } from '@features/profile/components/ProfileBio';
import { ProfileHeader } from '@features/profile/components/ProfileHeader';
import { ProfileLinks } from '@features/profile/components/ProfileLinks';
import { useGetUserQuery } from '@services/api/';

import {
    ProfileContainer,
    ProfileLoader,
    ProfileSection,
    ProfileWrapper,
} from './profile.styles';

/** Loads and displays the profile page for the username in the URL. */
export const Profile = () => {
    const { username } = useParams<{ username: string }>();

    const {
        data: user,
        isLoading,
        isFetching,
        isError,
    } = useGetUserQuery(username ?? '', {
        skip: !username,
    });

    /** Shows a loader while the profile data is being fetched. */
    if (isLoading || isFetching) {
        return (
            <ProfileContainer>
                <ProfileLoader>
                    <Loader />
                </ProfileLoader>
            </ProfileContainer>
        );
    }

    /** Shows an error message if the profile could not be loaded. */
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
