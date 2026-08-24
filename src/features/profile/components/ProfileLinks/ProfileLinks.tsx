import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Box, Typography } from '@mui/material';

import type { IProfileLinksProps } from '@features/profile/types/profile.types';

import { LinkItem, LinkValue, StyledTypography } from './profileLinks.styles';

/** Displays the user's GitHub, blog, and email details. */
export const ProfileLinks = ({
    githubUrl,
    blog,
    email,
}: IProfileLinksProps) => {
    /** Checks if at least one contact link is available. */
    const isLinkAvailable = githubUrl || blog || email;

    return (
        <Box display="flex" flexDirection="column" padding={2}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
                <LinkOutlinedIcon fontSize="small" />
                <Typography variant="h4">Links & Contact</Typography>
            </Box>

            {isLinkAvailable ? (
                <>
                    {githubUrl && (
                        <LinkItem>
                            <GitHubIcon fontSize="small" />
                            <Typography variant="body1">GitHub</Typography>
                            <LinkValue
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {githubUrl.replace('https://github.com/', '')}

                                <OpenInNewOutlinedIcon fontSize="inherit" />
                            </LinkValue>
                        </LinkItem>
                    )}

                    {blog && (
                        <LinkItem>
                            <LinkOutlinedIcon fontSize="small" />

                            <Typography variant="body1">Blog</Typography>

                            <LinkValue
                                href={
                                    blog.startsWith('http')
                                        ? blog
                                        : `https://${blog}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {blog}

                                <OpenInNewOutlinedIcon fontSize="inherit" />
                            </LinkValue>
                        </LinkItem>
                    )}

                    {email && (
                        <LinkItem>
                            <EmailOutlinedIcon fontSize="small" />

                            <Typography variant="body1">Email</Typography>

                            <LinkValue href={`mailto:${email}`}>
                                {email}
                            </LinkValue>
                        </LinkItem>
                    )}
                </>
            ) : (
                /** Shows a message when the user has no contact details. */
                <StyledTypography variant="body1" color="text.secondary">
                    No Links & Contacts Available!
                </StyledTypography>
            )}
        </Box>
    );
};
