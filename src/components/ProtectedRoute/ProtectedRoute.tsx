import { Navigate, Outlet } from 'react-router-dom';

import { getCookie } from '@utils/cookie';

export const ProtectedRoute = () => {
    const username = getCookie('username');

    return username ? <Outlet /> : <Navigate to="/login" replace />;
};
