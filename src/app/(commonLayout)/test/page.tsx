'use client';
import { useGetInfinitePosts } from '@/hooks/post.hook';
import { IPost } from '@/types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface IProps {
  searchTerm?: string;
  category?: string;
  voteFilter?: string;
  limit: number;
}

const itemForPerPage = 2;

const PostsList = ({
  searchTerm,
  category,
  voteFilter,
  limit = itemForPerPage,
}: IProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useGetInfinitePosts({
    searchTerm,
    category,
    voteFilter,
    limit,
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }
  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mx-auto max-w-sm">
      {data?.pages?.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data?.map((item: IPost) => (
            <p
              className="mt-4 rounded border p-10 text-center"
              key={item?._id}
            >
              {item?.title}
            </p>
          ))}
        </React.Fragment>
      ))}

      {/* Load More sentinel element */}
      <div ref={loadMoreRef} className="mt-4 p-2 text-center">
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load more posts...'
            : 'No more posts to load'}
      </div>

      {/* Show fetching status */}
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
};

export default PostsList;
