import { Link, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import { UserSearch } from '@features/user-search';
import { useAuth } from '@hooks/useAuth';

import { AuthButton, HeaderContainer } from './header.styles';
import { HeaderProps } from './header.types';

/**
 * Header containing the GitHub logo, user search,
 * and authentication actions based on the user's login state.
 */
export const Header = ({ logo, logoAlt }: HeaderProps) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleLogin = () => {
        void navigate('/login');
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
                    // Show user Profile button for authenticated users.
                    <AuthButton>Profile Button</AuthButton>
                ) : (
                    // Show login and signup buttons for unauthenticated users.
                    <>
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
