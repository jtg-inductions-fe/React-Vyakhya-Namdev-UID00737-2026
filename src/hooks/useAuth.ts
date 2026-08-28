/**
 * Provides the current authentication state of the application.
 *
 * @returns {object} Authentication state containing the user
 * and `isAuthenticated` flag.
 */
import { useCallback, useState } from 'react';

import { auth } from '@utils/auth';

export const useAuth = () => {
    const [user, setUser] = useState(() => auth.getUser());
    const isAuthenticated = user !== null;
    const logout = useCallback(() => {
        auth.clearAuth();
        setUser(null);
    }, []);

    return { user, isAuthenticated, logout };
};
