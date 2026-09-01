import { Avatar, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

/** Sets the size of the user's profile image. */
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(325),
    height: theme.typography.pxToRem(325),
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: theme.palette.customShadows.avatar,
}));

/** Arranges each profile statistic with its value and label. */
export const StatContent = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
});

/** Styles the follow button using the theme colors. */
export const ProfileActionButton = styled(Button)(({ theme }) => ({
    gap: theme.spacing(2),
    backgroundColor: theme.palette.success.main,
    color: theme.palette.background.default,
    width: theme.typography.pxToRem(120),
    textTransform: 'capitalize',

    '&:hover': {
        backgroundColor: theme.palette.interaction.hover_button,
    },
}));

/** Styles the edit button using the theme colors. */
export const EditButton = styled(Button)(({ theme }) => ({
    gap: theme.spacing(1),
    color: theme.palette.customColors.button_text_secondary,
    borderColor: theme.palette.customColors.button_text_secondary,
    width: theme.typography.pxToRem(150),
    textTransform: 'capitalize',

    '&:hover': {
        color: theme.palette.interaction.hover_button,
        borderColor: theme.palette.interaction.hover_button,
    },
}));
