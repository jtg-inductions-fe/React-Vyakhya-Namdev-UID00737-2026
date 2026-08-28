import { AUTH_TOKEN_KEY, COOKIE_MAX_AGE } from '@constants/authConstants';
import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

/** Provides methods to store, retrieve and clear authentication data */
export const auth = {
    /** Retrieves the authentication token from cookies */
    getToken: (): string | null => getCookie(AUTH_TOKEN_KEY),

    /** Stores the authentication token in cookies */
    setToken: (token: string): void => {
        setCookie(AUTH_TOKEN_KEY, token, COOKIE_MAX_AGE);
    },

    /** Clears the stored authentication token */
    clearAuth: (): void => {
        deleteCookie(AUTH_TOKEN_KEY);
    },
};
