import { ChangeEvent, FormEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthenticateUserMutation } from 'services/api/api';
import { authStorage } from 'services/auth/authStorage';

import {
    MIN_PASSWORD_LENGTH,
    MIN_USERNAME_LENGTH,
} from '../../../../constants/authConstants';
import { LoginErrors } from '../types/login.types';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});
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
            newErrors.password = 'Password is required!';
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters!`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** Updates the username and clears its related errors */
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);

        if (errors.username || errors.authentication) {
            setErrors((previous) => ({
                ...previous,
                username: undefined,
                authentication: undefined,
            }));
        }
    };

    /** Updates the password and clears its related errors */
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

        if (errors.password || errors.authentication) {
            setErrors((previous) => ({
                ...previous,
                password: undefined,
                authentication: undefined,
            }));
        }
    };

    /** Handles form validation, authentication and redirect after login */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const user = await authenticateUser({
                username: username.trim(),
                token: password,
            }).unwrap();

            /** Checks whether the logged-in account matches the entered username */
            if (
                user.username.toLocaleLowerCase() !==
                username.trim().toLocaleLowerCase()
            ) {
                setErrors({
                    authentication: 'User name not matched!',
                });
                return;
            }

            authStorage.setAuth(user, password);
            void navigate(`/profile/${user.username}`);
        } catch (error) {
            /** Handles authentication errors returned by the API */
            if (
                typeof error === 'object' &&
                error !== null &&
                'status' in error
            ) {
                const apiError = error as {
                    status?: number;
                };

                if (apiError.status === 401 || apiError.status === 403) {
                    setErrors({
                        authentication: 'Invalid credentials provided!',
                    });
                    return;
                }
            }

            /** Handles unexpected errors during login */
            setErrors({
                authentication: 'Unable to login, Please try again!',
            });
        }
    };

    return {
        username,
        password,
        errors,
        isLoading,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
    };
};
