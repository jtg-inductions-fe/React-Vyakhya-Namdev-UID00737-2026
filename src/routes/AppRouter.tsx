import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@layouts/MainLayout';

import { ErrorPage } from '@components/ErrorPage';
import { Login } from '@features/auth/Login';
import { LandingPage } from '@features/landing';
import { Profile } from '@features/profile';

/**
 * Application route configuration.
 */
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'profile/:username',
                element: <Profile />,
            },
        ],
    },
]);
