import { Box } from '@mui/material';

import heroImage from '@assets/image/hero-image.png';

/**
 * Landing page of the application.
 * @description
 * Renders the application header along with the hero section
 * that introduces the GitHub developer discovery feature.
 */
export const LandingPage = () => (
    <Box>
        <Box
            component="main"
            width="100%"
            height="calc(100vh - 72px)"
            display="flex"
            justifyContent="center"
            overflow="hidden"
        >
            <Box
                component="img"
                src={heroImage}
                alt="Discover GitHub developers"
                width="100vw"
                height="100%"
                display="block"
            />
        </Box>
    </Box>
);
