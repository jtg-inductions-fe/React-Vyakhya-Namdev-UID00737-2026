import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import logo from '@assets/image/github-logo.png';
import { Header } from '@components/Header';

export const MainLayout = () => (
    <>
        <Header logo={logo} logoAlt="Github home" />
        <Box component="main">
            <Outlet />
        </Box>
    </>
);
