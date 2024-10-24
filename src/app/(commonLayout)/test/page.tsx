'use client';
import { useGetInfinitePosts } from '@/hooks/post.hook';
import { IPost } from '@/types';
import React from 'react';

interface IProps {
  searchTerm?: string;
  category?: string;
  voteFilter?: string;
}

const PostsList = ({ searchTerm, category, voteFilter }: IProps) => {
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
  });

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
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
      <div>
        <button
          className="mt-2 rounded border p-2"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
};

export default PostsList;
