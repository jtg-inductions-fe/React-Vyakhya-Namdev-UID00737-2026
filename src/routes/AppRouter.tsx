import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@layouts/MainLayout';

import { ErrorPage } from '@components/ErrorPage';
import { LoginForm } from '@features/auth';
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
                path: 'profile/:username',
                element: <Profile />,
            },
        ],
    },
    {
        path: 'login',
        element: <LoginForm />,
    },
]);
