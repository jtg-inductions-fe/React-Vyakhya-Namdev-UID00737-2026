import { Navigate, Outlet } from 'react-router-dom';

import { auth } from '@utils/auth';

export const ProtectedRoute = () => {
    const isAuthenticated = Boolean(auth.getToken());

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
