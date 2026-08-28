import {
    AUTH_TOKEN_KEY,
    AUTH_USER_KEY,
    COOKIE_MAX_AGE,
} from '@constants/authConstants';
import { IGithubUser } from '@services/api/';
import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

/** Provides methods to store, retrieve and clear authentication data */
export const auth = {
    /** Retrieves the authenticated user's data from cookies */
    getUser: (): IGithubUser | null => {
        const storedUser = getCookie(AUTH_USER_KEY);

        if (!storedUser) {
            return null;
        }

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
