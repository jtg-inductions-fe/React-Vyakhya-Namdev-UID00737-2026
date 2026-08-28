/**
 * Provides the current authentication state of the application.
 *
 * @returns {object} Authentication state containing the user
 * and `isAuthenticated` flag.
 */
import { useCallback, useState } from 'react';

import { authStorage } from '@services/auth/storage';

export const useAuth = () => {
    const [user, setUser] = useState(() => authStorage.getUser());
    const isAuthenticated = user !== null;
    const logout = useCallback(() => {
        authStorage.clearAuth();
        setUser(null);
    }, []);

    return { user, isAuthenticated, logout };
};
