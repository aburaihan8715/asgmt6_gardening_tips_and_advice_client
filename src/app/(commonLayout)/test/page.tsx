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
