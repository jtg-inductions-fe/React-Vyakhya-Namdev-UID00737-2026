import { Navigate, Outlet } from 'react-router-dom';

import { auth } from '@utils/auth';

export const ProtectedRoute = () => {
    const isAuthenticated = Boolean(auth.getUser());
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
