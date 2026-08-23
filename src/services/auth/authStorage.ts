import { IGithubUser } from 'services/api/api.types';

import {
    AUTH_TOKEN_KEY,
    AUTH_USER_KEY,
    COOKIE_MAX_AGE,
} from '../../constants/authConstants';

/** Creates a cookie with the given value and expiration time */
const setCookie = (name: string, value: string, maxAge: number): void => {
    document.cookie = [
        `${name}=${encodeURIComponent(value)}`,
        `Max-Age=${maxAge}`,
        'Path=/',
        'SameSite=Lax',
    ].join('; ');
};

/** Returns the stored value of a cookie by its name */
const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((cookieValue) =>
        cookieValue.startsWith(`${name}=`),
    );

    if (!cookie) return null;

    return decodeURIComponent(cookie.substring(name.length + 1));
};

/** Removes a cookie by setting its maximum age to zero */
const deleteCookie = (name: string): void => {
    document.cookie = [`${name}=`, 'Max-Age=0', 'Path=/', 'SameSite=Lax'].join(
        '; ',
    );
};

/** Provides methods to store, retrieve and clear authentication data */
export const authStorage = {
    /** Retrieves the authenticated user's data from cookies */
    getUser: (): IGithubUser | null => {
        const storedUser = getCookie(AUTH_USER_KEY);

        if (!storedUser) return null;

        try {
            return JSON.parse(storedUser) as IGithubUser;
        } catch {
            deleteCookie(AUTH_USER_KEY);
            return null;
        }
    },

    /** Retrieves the authentication token from cookies */
    getToken: (): string | null => getCookie(AUTH_TOKEN_KEY),

    /** Stores the authenticated user and token in cookies */
    setAuth: (user: IGithubUser, token: string): void => {
        setCookie(AUTH_USER_KEY, JSON.stringify(user), COOKIE_MAX_AGE);

        setCookie(AUTH_TOKEN_KEY, token, COOKIE_MAX_AGE);
    },

    /** Clears the stored authentication data */
    clearAuth: (): void => {
        deleteCookie(AUTH_USER_KEY);
        deleteCookie(AUTH_TOKEN_KEY);
    },
};
