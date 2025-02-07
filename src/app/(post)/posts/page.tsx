'use client';
import { useGetInfinitePosts } from '@/hooks/post.hook';
import { IPost } from '@/types/postData.type';
import { useDebouncedCallback } from 'use-debounce';
import { useInView } from 'react-intersection-observer';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import PostItem from '../_components/PostItem';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import Container from '@/components/common/Container';

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
    <section className="py-5">
      <Container>
        <div className="flex flex-col-reverse gap-10 md:flex-row">
          <div className="flex-[3]">
            <ul className="">
              {status === 'pending' && <LoadingWithOverlay />}
              {status === 'error' && (
                <ErrorMessage>
                  {error.message || 'Failed to fetch posts data!!'}
                </ErrorMessage>
              )}
              {data?.pages?.map((group, i) => (
                <React.Fragment key={i}>
                  {group?.data?.map((item: IPost) => (
                    <PostItem key={item._id} post={item} />
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

          <div className="h-full flex-1 px-2">
            <div className="h-full">
              <div className="h-full">
                <section className="flex flex-col gap-10">
                  <div className="flex-1">
                    <Input
                      onChange={(e) => searchTermDebounce(e.target.value)}
                      type="search"
                      name="search"
                      id="search"
                      className="w-full rounded-full"
                      placeholder="Search a post..."
                    />
                  </div>

                  <div className="flex-1 space-y-3 font-semibold">
                    <p>Filter</p>
                    <RadioGroup
                      value={voteFilter}
                      onValueChange={setVoteFilter}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upvotesCount" id="r2" />
                        <Label htmlFor="r2">Upvote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="downvotesCount" id="r3" />
                        <Label htmlFor="r3">Downvote</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex-1 space-y-3 font-semibold">
                    <p>Category</p>
                    <RadioGroup
                      value={category}
                      onValueChange={setCategory}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Vegetables" id="r2" />
                        <Label htmlFor="r2">Vegetables</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Landscaping" id="r3" />
                        <Label htmlFor="r3">Landscaping</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Others" id="r4" />
                        <Label htmlFor="r4">Others</Label>
                      </div>
                    </RadioGroup>
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
        </div>
      </Container>
    </section>
  );
};

export default Posts;
