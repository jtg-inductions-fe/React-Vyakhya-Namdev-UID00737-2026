import { Box, Snackbar, Typography } from '@mui/material';

import { Loader } from '@components/Loader';

import { LoginCard, StyledButton, StyledTextField } from './loginForm.styles';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
    const {
        username,
        password,
        errors,
        apiError,
        isLoading,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
    } = useLoginForm();

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <LoginCard>
                <Box
                    component="form"
                    display="flex"
                    flexDirection="column"
                    gap={5}
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                >
                    {/* Login form heading */}
                    <Typography
                        variant="h3"
                        textAlign="center"
                        color="text.primary"
                    >
                        Welcome Back!
                    </Typography>

                    {/* Username input field */}
                    <StyledTextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                        fullWidth
                        size="small"
                    />

                    {/* Password input field */}
                    <StyledTextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password ?? 'Enter your GitHub PAT'}
                        fullWidth
                        size="small"
                    />

                    {/* Submits the login form */}
                    <StyledButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? <Loader /> : 'Login'}
                    </StyledButton>
                </Box>
            </LoginCard>
            <Snackbar
                open={Boolean(apiError)}
                autoHideDuration={500}
                message={apiError}
            />
        </Box>
    );
};
