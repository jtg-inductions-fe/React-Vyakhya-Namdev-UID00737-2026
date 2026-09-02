import { HowToReg, PersonAddAlt } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';

import { StyledButton, UserAvatar } from './userInfoCard.styles';
import { IUserSuggestion } from './userInfoCard.types';

/**
 * Displays GitHub user information in a compact card.
 * Optionally displays the user's bio and a remove action
 * when rendered as a suggestion.
 */
export const UserInfo = ({
    user,
    showSuggestionActions = false,
    showFollowAction = false,
    onFollow,
    isFollowing = false,
    isFollowingLoading = false,
}: IUserSuggestion) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
    >
        <Box display="flex" alignItems="center">
            <UserAvatar src={user.avatarUrl} alt={user.username} />
            <Box>
                <Typography variant="subtitle1">{user.username}</Typography>

                {showSuggestionActions && user.bio && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                    >
                        {user.bio}
                    </Typography>
                )}
            </Box>
        </Box>

        {showSuggestionActions && (
            <IconButton size="small" aria-label={`Remove ${user.username}`}>
                <CloseIcon fontSize="small" />
            </IconButton>
        )}

        {showFollowAction && (
            <StyledButton
                variant="outlined"
                onClick={onFollow}
                disabled={isFollowingLoading}
                startIcon={isFollowing ? <HowToReg /> : <PersonAddAlt />}
            >
                <Typography>
                    {isFollowingLoading ? 'Following...' : 'Follow'}
                </Typography>
            </StyledButton>
        )}
    </Box>
);
