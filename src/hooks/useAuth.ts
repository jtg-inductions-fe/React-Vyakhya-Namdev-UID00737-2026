/**
 * Provides the current authentication state of the application.
 *
 * @returns {object} Authentication state containing the user
 * and `isAuthenticated` flag.
 */
import { useCallback, useState } from 'react';

import { useGetAuthenticatedUserQuery } from '@services/api';
import { auth } from '@utils/auth';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        Boolean(auth.getToken()),
    );

    const token = auth.getToken();
    const { data: user } = useGetAuthenticatedUserQuery(token ?? '', {
        skip: !isAuthenticated || !token,
    });

    const logout = useCallback(() => {
        auth.clearAuth();
        setIsAuthenticated(false);
    }, []);

    return {
        user,
        isAuthenticated,
        logout,
    };
};
