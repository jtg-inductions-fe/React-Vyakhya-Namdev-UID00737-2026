import { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { Loader } from '@components/Loader';
import { UserInfo } from '@components/UserInfoCard';
import { FOLLOWERS_PER_PAGE } from '@features/profile/profile.constants';
import { IGithubUser, useGetFollowersQuery } from '@services/api';

import { CardSection, FollowerSection } from './followers.styles';

export const Followers = () => {
    const { username } = useParams<{ username: string }>();
    const [page, setPage] = useState(1);
    const [allFollowers, setAllFollowers] = useState<IGithubUser[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const {
        data: followers = [],
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetFollowersQuery(
        {
            username: username ?? '',
            page,
            perPage: FOLLOWERS_PER_PAGE,
        },
        {
            skip: !username,
        },
    );

    /**
     * Resetting pagination when another user's followers page is opened.
     */
    useEffect(() => {
        setPage(1);
        setAllFollowers([]);
        setHasMore(true);
    }, [username]);

    /**
     * Adding newly fetched followers to existing list.
     */
    useEffect(() => {
        if (isFetching) return;

        setAllFollowers((prevFollowers) => {
            if (page === 1) return followers;

            return [...prevFollowers, ...followers];
        });

        if (followers.length < FOLLOWERS_PER_PAGE) {
            setHasMore(false);
        }
    }, [followers, page, isFetching]);

    /**
     * Observes the last follower and loads the next page.
     */
    const lastFollowerRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isFetching || !hasMore || isError) return;

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    observer.current?.disconnect();

                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [isFetching, hasMore, isError],
    );

    if (isLoading && page === 1) {
        return <Loader />;
    }

    /**
     * Show full error only when no followers were loaded.
     */
    if (isError && allFollowers.length === 0) {
        return (
            <Box>
                <Typography>Unable to load followers!</Typography>
                <Button onClick={() => void refetch()}>Retry</Button>
            </Box>
        );
    }

    return (
        <FollowerSection>
            <Typography
                variant="h3"
                mb={4}
                display="flex"
                justifyContent="center"
            >
                {username} Followers
            </Typography>

            <CardSection>
                {allFollowers.length === 0 && !isFetching ? (
                    <Typography color="text.secondary">
                        No followers found!
                    </Typography>
                ) : (
                    <Box display="flex" flexDirection="column" gap={3}>
                        {allFollowers.map((user, index) => {
                            const isLastFollower =
                                index === allFollowers.length - 1;

                            return (
                                <Box
                                    key={user.username}
                                    ref={
                                        isLastFollower ? lastFollowerRef : null
                                    }
                                >
                                    <UserInfo user={user} showFollowAction />
                                </Box>
                            );
                        })}

                        {isError && allFollowers.length > 0 && (
                            <Box>
                                <Typography>
                                    Unable to load more followers!
                                </Typography>
                                <Button onClick={() => void refetch()}>
                                    Retry
                                </Button>
                            </Box>
                        )}

                        {isFetching && <Loader />}
                    </Box>
                )}
            </CardSection>
        </FollowerSection>
    );
};
