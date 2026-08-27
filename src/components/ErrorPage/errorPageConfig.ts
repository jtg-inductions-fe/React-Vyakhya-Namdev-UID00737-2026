import { ErrorPageConfig } from './errorPage.types';

export const ERROR_PAGE_CONFIG: Record<number, ErrorPageConfig> = {
    400: {
        title: 'Bad Request',
        description: 'The request could not be processed!',
    },
    401: {
        title: 'Unauthorized',
        description: 'You need to be authenticated to access this page!',
    },
    403: {
        title: 'Forbidden',
        description: 'You do not have permission to access this page!',
    },
    404: {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist!',
    },
    500: {
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again later!',
    },
};
