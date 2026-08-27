import {
    Button,
    Card,
    inputLabelClasses,
    outlinedInputClasses,
    TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';

/** Main card that contains the login form */
export const LoginCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.typography.pxToRem(400),
    padding: theme.spacing(10),
    boxShadow: theme.palette.customShadows.form,
    borderRadius: theme.typography.pxToRem(15),
}));

/** Custom styles for the login form input fields */
export const StyledTextField = styled(TextField)(({ theme }) => ({
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
        {
            borderColor: theme.palette.text.primary,
        },

    [`& .${inputLabelClasses.root}.${inputLabelClasses.focused}`]: {
        color: theme.palette.text.primary,
    },
}));

/** Styles for the login button */
export const StyledBuuton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.interaction.hoverDark,
    },
}));
