/*

'use client';
import { useGetAllPosts } from '@/hooks/post.hook';
import React from 'react';

const Test = () => {
  const { data } = useGetAllPosts();
  console.log(data);
  const postData = data?.data[0];
  console.log(postData);
  return (
    <div className="mt-[80px]">
      {postData ? (
        <div dangerouslySetInnerHTML={{ __html: postData.content }}></div> //
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test;
*/

'use client';
import Post from '@/components/modules/allPosts/Post';
import { useGetAllPosts } from '@/hooks/post.hook';
import { IPost } from '@/types/postData.type';
import React from 'react';

const PostList = () => {
  const { data: postData, isLoading, isError, error } = useGetAllPosts();
  const posts = postData?.data;

  console.log(posts);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    console.error('Error fetching posts:', error);
    return <div>Error fetching posts.</div>;
  }
  return (
    <ul className="space-y-10 md:p-5">
      {posts?.map((post: IPost) => <Post key={post._id} post={post} />)}
    </ul>
  );
};

export default PostList;
