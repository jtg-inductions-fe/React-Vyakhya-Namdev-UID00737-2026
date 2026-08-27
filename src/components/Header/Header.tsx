import { type MouseEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import { Avatar, Divider } from '@mui/material';

import { UserSearch } from '@features/user-search';
import { useAuth } from '@hooks/useAuth';

import {
    AuthButton,
    HeaderContainer,
    ProfileButton,
    ProfileMenu,
    StyledMenuItem,
} from './header.styles';
import { HeaderProps } from './header.types';

/**
 * Header containing the GitHub logo, user search,
 * and authentication actions based on the user's login state.
 */
export const Header = ({ logo, logoAlt }: HeaderProps) => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const [profile, setProfile] = useState<null | HTMLElement>(null);

    const isProfileMenuOpen = Boolean(profile);

    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setProfile(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfile(null);
    };

    const handleProfileClick = () => {
        handleProfileMenuClose();
        void navigate(`/profile/${user?.username}`);
    };
    const handleLogout = () => {
        handleProfileMenuClose();
        logout();
        void navigate('/', { replace: true });
    };

    const handleLogin = () => {
        void navigate('/login');
    };

    const handlePageNotFound = () => {
        void navigate('/page-not-found');
    };

    return (
        <HeaderContainer>
            <Box display="flex" alignItems="center" gap={5} flex={1}>
                <Link to="/">
                    <Box
                        component="img"
                        src={logo}
                        alt={logoAlt}
                        width={40}
                        height={40}
                    />
                </Link>

                <UserSearch />
            </Box>

            <Box display="flex" alignItems="center" gap={2} ml={3}>
                {isAuthenticated ? (
                    <>
                        <ProfileButton
                            type="button"
                            onClick={handleProfileMenuOpen}
                            aria-label="Open Profile Menu"
                            aria-controls={
                                isProfileMenuOpen ? 'profile-menu' : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                                isProfileMenuOpen ? 'true' : undefined
                            }
                        >
                            <Avatar
                                src={user?.avatarUrl}
                                alt={user?.username ?? ''}
                            />
                        </ProfileButton>

                        <ProfileMenu
                            id="profile-menu"
                            anchorEl={profile}
                            open={isProfileMenuOpen}
                            onClose={handleProfileMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <StyledMenuItem>
                                <Avatar
                                    src={user?.avatarUrl}
                                    alt={user?.username ?? ''}
                                />
                                {user?.username}
                            </StyledMenuItem>
                            <Divider />
                            <StyledMenuItem onClick={handleProfileClick}>
                                <PersonOutlineIcon fontSize="small" />
                                My Profile
                            </StyledMenuItem>
                            <StyledMenuItem onClick={handlePageNotFound}>
                                <SettingsIcon fontSize="small" />
                                Settings
                            </StyledMenuItem>
                            <StyledMenuItem onClick={handlePageNotFound}>
                                <SaveIcon fontSize="small" />
                                Saved Repositories
                            </StyledMenuItem>
                            <StyledMenuItem onClick={handlePageNotFound}>
                                <HelpIcon fontSize="small" />
                                Help
                            </StyledMenuItem>
                            <Divider />
                            <StyledMenuItem onClick={handleLogout}>
                                <LogoutIcon fontSize="small" />
                                Logout
                            </StyledMenuItem>
                        </ProfileMenu>
                    </>
                ) : (
                    <>
                        {/*
                            Showing authentication buttons when user is not logged in
                        */}
                        <AuthButton variant="text" onClick={handleLogin}>
                            Log in
                        </AuthButton>

                        <AuthButton variant="contained" onClick={handleLogin}>
                            Sign up
                        </AuthButton>
                    </>
                )}
            </Box>
        </HeaderContainer>
    );
};
