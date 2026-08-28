import { ChangeEvent, FormEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { MIN_USERNAME_LENGTH } from '@constants/index';
import { CLASSIC_PAT_REGEX, FINE_GRAINED_PAT_REGEX } from '@constants/index';
import { useAuthenticateUserMutation } from '@services/api';
import { auth } from '@utils/auth';

import { LoginErrors } from '../types/login.types';

const AUTH_ERROR_MESSAGES: Record<number, string> = {
    401: 'Invalid username or personal access token!',
    403: 'You are not authorized to access this account!',
    404: 'GitHub account not found!',
};

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});
    const [apiError, setApiError] = useState<string>('');
    const [authenticateUser, { isLoading }] = useAuthenticateUserMutation();

    /** Validates the username and password before login */
    const validate = (): boolean => {
        const newErrors: LoginErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Username is required!';
        } else if (username.trim().length < MIN_USERNAME_LENGTH) {
            newErrors.username = `Username must be at least ${MIN_USERNAME_LENGTH} characters!`;
        }

        if (!password) {
            newErrors.password = 'Personal access token is required!';
        } else {
            const isValidClassic = CLASSIC_PAT_REGEX.test(password);
            const isValidFineGrained = FINE_GRAINED_PAT_REGEX.test(password);

            if (!isValidClassic && !isValidFineGrained) {
                newErrors.password =
                    'Invalid token format! Please provide valid PAT.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** Updates the username and clears its related errors */
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);

        if (errors.username) {
            setErrors((previous) => ({
                ...previous,
                username: undefined,
            }));
        }
        setApiError('');
    };

    /** Updates the password and clears its related errors */
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

        if (errors.password) {
            setErrors((previous) => ({
                ...previous,
                password: undefined,
            }));
        }
        setApiError('');
    };

    /** Handles form validation, authentication and redirect after login */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setApiError('');
        if (!validate()) {
            return;
        }

        try {
            const user = await authenticateUser({
                username: username.trim(),
                token: password,
            }).unwrap();

            /** Checks whether the logged-in account matches the entered username */
            if (user.username.toLowerCase() !== username.trim().toLowerCase()) {
                setApiError('Invalid credentials provided!');
                return;
            }

            auth.setToken(password);
            void navigate(`/profile/${user.username}`, {
                state: {
                    message: 'LoggedIn successful!',
                },
            });
        } catch (error) {
            /** Handles authentication errors returned by the API */
            if (
                typeof error === 'object' &&
                error !== null &&
                'status' in error
            ) {
                const errorResponse = error as {
                    status?: number;
                    data?: {
                        message?: string;
                    };
                };

                const errorMessage =
                    errorResponse.data?.message ??
                    (errorResponse.status
                        ? AUTH_ERROR_MESSAGES[errorResponse.status]
                        : undefined) ??
                    'Unable to login, Please try again!';

                setApiError(errorMessage);
                return;
            }

            /** Handles unexpected errors during login */
            setApiError('Unable to login, Please try again!');
        }
    };

    return {
        username,
        password,
        errors,
        apiError,
        isLoading,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
    };
};
