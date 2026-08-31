/**
 * Provides the current authentication state of the application.
 *
 * @returns Authentication state containing the user,
 * authentication status, and login/logout methods.
 */
import { useCallback } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { AUTH_TOKEN_KEY, COOKIE_MAX_AGE } from '@constants';
import { setAuthenticated } from '@features/auth';
import {
    useGetAuthenticatedUserQuery,
    useLazyGetAuthenticatedUserQuery,
} from '@services/api';
import { useAppDispatch, useAppSelector } from '@store';
import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated,
    );

    const storedToken = getCookie(AUTH_TOKEN_KEY);

    const { data: authenticatedUser } = useGetAuthenticatedUserQuery(
        isAuthenticated && storedToken ? storedToken : skipToken,
    );

    const [getAuthenticatedUser, { isLoading }] =
        useLazyGetAuthenticatedUserQuery();

    const login = useCallback(
        async (loginToken: string) => {
            const loggedInUser =
                await getAuthenticatedUser(loginToken).unwrap();

            setCookie(AUTH_TOKEN_KEY, loginToken, COOKIE_MAX_AGE);
            dispatch(setAuthenticated(true));

            return loggedInUser;
        },
        [dispatch, getAuthenticatedUser],
    );

    const logout = useCallback(() => {
        deleteCookie(AUTH_TOKEN_KEY);
        dispatch(setAuthenticated(false));
    }, [dispatch]);

    return {
        user: authenticatedUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
};
