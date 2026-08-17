import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

import {
    avatarStyles,
    bioStyles,
    removeButtonStyles,
    userInfoContainerStyles,
    userInfoDetailsStyles,
} from './UserInfoCard.styles';
import { UserSuggestionProps } from './UserInfoCard.types';

/**
 * Displays GitHub user information in a compact card.
 * Optionally displays the user's bio and a remove action
 * when rendered as a suggestion.
 */
const UserInfo = ({
    user,
    showSuggestionActions = false,
}: UserSuggestionProps) => (
    <Box sx={userInfoContainerStyles}>
        <Box sx={userInfoDetailsStyles}>
            <Avatar
                src={user.avatarUrl}
                alt={user.username}
                sx={avatarStyles}
            />
            <Box>
                <Typography variant="subtitle1">{user.username}</Typography>

                {showSuggestionActions && user.bio && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={bioStyles}
                    >
                        {user.bio}
                    </Typography>
                )}
            </Box>
        </Box>

        {/* Show suggestion-specific actions only when enabled. */}
        {showSuggestionActions && (
            <IconButton
                size="small"
                aria-label={`Remove ${user.username}`}
                sx={removeButtonStyles}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        )}
    </Box>
);

export default UserInfo;
