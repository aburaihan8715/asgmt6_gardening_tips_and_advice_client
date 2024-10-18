'use client';
import Post from '@/components/modules/allPosts/Post';
import Gallery from '@/components/ui/Gallery';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionHeading from '@/components/ui/SectionHeading';
import { useGetAllPosts } from '@/hooks/post.hook';
import { IPost } from '@/types/postData.type';
import { useDebouncedCallback } from 'use-debounce';

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
import { useState } from 'react';
import NoDataFound from '@/components/ui/NoDataFound';
const Posts = () => {
  const [voteFilter, setVoteFilter] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermDebounce = useDebouncedCallback((value) => {
    setSearchTerm(value);
  }, 1000);

  const { data, isLoading, isError } = useGetAllPosts({
    searchTerm,
    category,
    voteFilter,
  });
  const postData = data?.data;
  // console.log(data);

  const handleClearFilter = () => {
    setVoteFilter('');
    setCategory('');
    setSearchTerm('');
  };

  return (
    <div className="mt-[80px] flex h-[calc(100vh-80px)]">
      <div className="fixed h-full w-[25%]">
        <div className="fixed h-full w-[25%] p-5">
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

      <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full ml-[25%] mr-[25%] h-full w-[50%] overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500">
        <div className="mt-5 flex justify-center">
          <SectionHeading heading="All Tips and Advice" />
        </div>

        <ul>
          {isLoading && <LoadingSpinner />}
          {isError && <NoDataFound />}
          {postData?.map((post: IPost) => {
            return <Post key={post._id} post={post} />;
          })}
        </ul>
      </div>

      <div className="fixed right-0 h-full w-[25%]">
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
