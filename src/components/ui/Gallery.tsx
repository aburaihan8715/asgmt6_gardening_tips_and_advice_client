'use client';
import React from 'react';
import Image from 'next/image';
import { useGetTopFivePosts } from '@/hooks/post.hook';
import { IPost } from '@/types';

const Gallery = () => {
  const { data } = useGetTopFivePosts();
  const posts = data?.data || [];
  const images = posts.map((item: IPost) => item?.image).slice(0, 4);

  return (
    <div className="mx-auto max-h-full max-w-7xl rounded border p-5">
      <div className="text-center">Dynamic Gallery</div>
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Top Image - Full Width */}
        <div className="col-span-1 aspect-[16/9] md:col-span-2">
          <Image
            src={`${images[0] || 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'}`}
            alt="Top Image"
            priority={false}
            width={1600}
            height={900}
            className="h-full w-full rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Middle Images */}
        <div className="col-span-1 aspect-[16/9] h-full">
          <Image
            src={`${images[1] || 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'}`}
            alt="Middle Left Image"
            width={800}
            priority={false}
            height={900}
            className="h-full w-full rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="col-span-1 h-full">
          <Image
            src={`${images[2] || 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'}`}
            alt="Middle Right Image"
            width={800}
            height={900}
            priority={false}
            className="aspect-[16/9] h-full w-full rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Bottom Image - Full Width */}
        <div className="col-span-1 aspect-[16/9] w-full md:col-span-2">
          <Image
            src={`${images[3] || 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'}`}
            alt="Bottom Image"
            width={1600}
            height={900}
            priority={false}
            className="h-full w-full rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
