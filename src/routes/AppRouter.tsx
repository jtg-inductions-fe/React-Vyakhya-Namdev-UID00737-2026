import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@layouts/MainLayout';

import { ErrorPage } from '@components/ErrorPage';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { LoginForm } from '@features/auth';
import { LandingPage } from '@features/landing/LandingPage';
import { Profile } from '@features/profile/Profile';

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
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'profile/:username',
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
    {
        path: 'login',
        element: <LoginForm />,
    },
]);
