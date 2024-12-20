'use client';
import Gallery from '@/components/ui/Gallery';
import { useGetInfinitePosts } from '@/hooks/post.hook';
import { IPost } from '@/types/postData.type';
import { useDebouncedCallback } from 'use-debounce';
import { useInView } from 'react-intersection-observer';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Post from './_components/Post';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';

const itemForPerPage = 2;

const Posts = () => {
  const [voteFilter, setVoteFilter] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermDebounce = useDebouncedCallback((value) => {
    setSearchTerm(value);
  }, 300);

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
    limit: itemForPerPage,
  });

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const handleClearFilter = () => {
    setVoteFilter('');
    setCategory('');
    setSearchTerm('');
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="mt-[80px] flex flex-col md:mt-0 md:flex-row">
      <div className="h-full border md:fixed md:w-[25%]">
        <div className="h-full p-1 md:fixed md:w-[25%] md:p-5">
          <div className="h-full">
            <section className="flex flex-col gap-4">
              <div className="flex-1">
                <Input
                  onChange={(e) => searchTermDebounce(e.target.value)}
                  type="search"
                  name="search"
                  id="search"
                  className="w-full"
                  placeholder="Search category, title..."
                />
              </div>
              <div className="flex-1">
                <Select value={voteFilter} onValueChange={setVoteFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by vote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>vote</SelectLabel>
                      <SelectItem value="upvotesCount">
                        Upvote high
                      </SelectItem>
                      <SelectItem value="downvotesCount">
                        Downvote high
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Vegetables">
                        Vegetables
                      </SelectItem>
                      <SelectItem value="Flowers">Flowers</SelectItem>
                      <SelectItem value="Landscaping">
                        Landscaping
                      </SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  className="w-full md:w-auto"
                  onClick={handleClearFilter}
                >
                  Clear filter
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="h-full md:ml-[25%] md:mr-[25%] md:w-[50%]">
        <ul className="md:p-5">
          {status === 'pending' && <LoadingWithOverlay />}
          {status === 'error' && (
            <ErrorMessage>
              {error.message || 'Failed to fetch posts data!!'}
            </ErrorMessage>
          )}
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.data?.map((item: IPost) => (
                <Post key={item._id} post={item} />
              ))}
            </React.Fragment>
          ))}
        </ul>

        {/* Load More sentinel element */}
        <div ref={loadMoreRef} className="mt-4 p-2 text-center">
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load more posts...'
              : 'No more posts to load'}
        </div>

        {/* Show fetching status */}
        <div>
          {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
        </div>
      </div>

      <div className="fixed right-0 hidden h-full w-[25%] md:block">
        <div className="fixed h-full w-[25%] p-5">
          <div className="h-full">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
