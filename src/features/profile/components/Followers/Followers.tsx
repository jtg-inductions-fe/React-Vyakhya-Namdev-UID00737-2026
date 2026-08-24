import { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { Loader } from '@components/Loader';
import { UserInfo } from '@components/UserInfoCard';
import { IGithubUser } from '@services/api/';
import { useGetFollowersQuery } from '@services/api/';

import { CardSection, FollowerSection } from './followers.styles';

const FOLLOWERS_PER_PAGE = 30;

/** Displays the followers of a GitHub user. */
export const Followers = () => {
    const { username } = useParams<{ username: string }>();

    const [page, setPage] = useState(1);
    const [allFollowers, setAllFollowers] = useState<IGithubUser[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const {
        data: followers = [],
        isLoading,
        isFetching,
        isError,
    } = useGetFollowersQuery(
        {
            username: username ?? '',
            page,
            perPage: FOLLOWERS_PER_PAGE,
        },
        {
            skip: !username || !hasMore,
        },
    );

    /** Resets followers when a different user's profile is opened */
    useEffect(() => {
        setPage(1);
        setAllFollowers([]);
        setHasMore(true);
    }, [username]);

    /** Adds newly fetched followers to the existing list */
    useEffect(() => {
        if (!followers.length) {
            return;
        }

        setAllFollowers((previousFollowers) => [
            ...previousFollowers,
            ...followers,
        ]);

        if (followers.length < FOLLOWERS_PER_PAGE) {
            setHasMore(false);
        }
    }, [followers]);

    /** Detects when the user reaches the bottom of the list */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetching && hasMore) {
                    setPage((previousPage) => previousPage + 1);
                }
            },
            {
                threshold: 0.1,
            },
        );

        const currentLoadMore = loadMoreRef.current;

        if (currentLoadMore) {
            observer.observe(currentLoadMore);
        }

        return () => {
            if (currentLoadMore) {
                observer.unobserve(currentLoadMore);
            }
        };
    }, [hasMore, isFetching]);

    if (isLoading && page === 1) {
        return <Loader />;
    }

    if (isError) {
        return (
            <Box>
                <Typography>Unable to load followers!</Typography>
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
                {allFollowers.length === 0 ? (
                    <Typography color="text.secondary">
                        No followers found!
                    </Typography>
                ) : (
                    <Box display="flex" flexDirection="column" gap={3}>
                        {allFollowers.map((user) => (
                            <Box key={user.username}>
                                <UserInfo user={user} showFollowAction />
                            </Box>
                        ))}

                        {/* Element observed for infinite scrolling */}
                        {hasMore && (
                            <Box
                                ref={loadMoreRef}
                                minHeight="20px"
                                display="flex"
                                justifyContent="center"
                            >
                                {isFetching && <Loader />}
                            </Box>
                        )}
                    </Box>
                )}
            </CardSection>
        </FollowerSection>
    );
};
