import { Avatar, Button, styled } from '@mui/material';

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(35),
    height: theme.typography.pxToRem(35),
    marginRight: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    gap: theme.spacing(0.5),
    color: theme.palette.customColors.button_text_secondary,
    borderColor: theme.palette.customColors.button_text_secondary,
    width: theme.spacing(25),
    textTransform: 'capitalize',

    '&:hover': {
        color: theme.palette.interaction.hover_follow_button,
        borderColor: theme.palette.interaction.hover_follow_button,
    },
}));
