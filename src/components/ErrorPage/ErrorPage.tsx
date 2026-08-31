import {
    isRouteErrorResponse,
    useNavigate,
    useRouteError,
} from 'react-router-dom';

import { Typography } from '@mui/material';

import { ErrorContainer, HomeButton } from './errorPage.styles';
import { ErrorPageProps } from './errorPage.types';
import { ERROR_PAGE_CONFIG } from './errorPageConfig';

export const ErrorPage = ({
    statusCode: providedStatusCode,
}: ErrorPageProps) => {
    const error = useRouteError();
    const navigate = useNavigate();

    const isRouteError = isRouteErrorResponse(error);
    const statusCode =
        providedStatusCode ?? (isRouteError ? error.status : 500);
    const errorConfig = ERROR_PAGE_CONFIG[statusCode] ?? ERROR_PAGE_CONFIG[500];

    const returnHomePage = () => {
        void navigate('/');
    };

    return (
        <ErrorContainer>
            <Typography variant="h1" color="text.primary">
                {statusCode}
            </Typography>

            <Typography variant="h3">{errorConfig.title}</Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={600}>
                {errorConfig.description}
            </Typography>

            <HomeButton variant="contained" onClick={returnHomePage}>
                Go to Home
            </HomeButton>
        </ErrorContainer>
    );
};
