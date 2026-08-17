import { useNavigate } from 'react-router-dom';

import logo from '@assets/image/logo.png';
import UserSearch from '@features/userSearch/UserSearch';
import useAuth from '@hooks/useAuth';

import {
    AuthButton,
    AuthSection,
    HeaderContainer,
    LogoContainer,
    LogoImage,
    SearchSection,
} from './Header.styles';

/**
 * Header containing the GitHub logo, user search,
 * and authentication actions based on the user's login state.
 */
const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <HeaderContainer>
            <SearchSection>
                <LogoContainer>
                    <LogoImage src={logo} alt="Github-logo" />
                </LogoContainer>
                <UserSearch />
            </SearchSection>

            <AuthSection>
                {isAuthenticated ? (
                    // Show user Profile button for authenticated users.
                    <AuthButton>Profile Button</AuthButton>
                ) : (
                    // Show login and signup buttins for unauthenticated users.
                    <>
                        <AuthButton onClick={() => void navigate('/login')}>
                            Log in
                        </AuthButton>

                        <AuthButton
                            variant="signup"
                            onClick={() => void navigate('/login')}
                        >
                            Sign up
                        </AuthButton>
                    </>
                )}
            </AuthSection>
        </HeaderContainer>
    );
};

export default Header;
