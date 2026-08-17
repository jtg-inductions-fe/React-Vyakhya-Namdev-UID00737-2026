/**
 * Provides the current authentication state of the application.
 *
 * @returns {object} Authentication state containing the user
 * and `isAuthenticated` flag.
 */
const useAuth = () => {
    const user = null;
    const isAuthenticated = user !== null;

    return { user, isAuthenticated };
};

export default useAuth;
