import { createBrowserRouter } from 'react-router-dom';

import Login from '@features/auth/Login';
import LandingPage from '@features/Landing/LandingPage';
import Profile from '@features/profile/Profile';

/**
 * Application route configuration.
 */
export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
]);
