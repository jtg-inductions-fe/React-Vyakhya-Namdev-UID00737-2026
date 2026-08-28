import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box, Snackbar } from '@mui/material';

import logo from '@assets/image/github-logo.png';
import { Header } from '@components/Header';

export const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    useEffect(() => {
        const state = location.state as {
            message?: string;
        } | null;

        if (state?.message) {
            setMessage(state.message);

            void navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location, navigate]);

    const handleClose = () => {
        setMessage('');
    };

    return (
        <>
            <Header logo={logo} logoAlt="Github home" />

            <Box component="main">
                <Outlet />
            </Box>

            <Snackbar
                open={Boolean(message)}
                autoHideDuration={3000}
                message={message}
                onClose={handleClose}
            />
        </>
    );
};
