'use client'; // Only for App Router

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Camera } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useGetSingleUser } from '@/hooks/user.hook';
import { IUser } from '@/types/user.type';
import { useGetAllPosts } from '@/hooks/post.hook';
import { IPost } from '@/types/post.type';

export default function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;
  const { data: userData, isLoading: isUserLoading } =
    useGetSingleUser(id);
  const user: IUser = userData?.data || {};

  const { data: postData, isLoading: isPostLoading } = useGetAllPosts({
    user: user._id,
  });
  const posts: IPost[] = postData?.data || [];

  console.log(posts);

  const [bio, setBio] = useState(
    'Web Developer | Tech Enthusiast | Music Lover',
  );
  const [editing, setEditing] = useState(false);
  const [bioInput, setBioInput] = useState(bio);

  if (isUserLoading || isPostLoading) {
    return 'Loading...';
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Cover Image */}
      <div className="relative h-64 w-full">
        <Image
          src="https://images.unsplash.com/photo-1520564816385-4f9d711941aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cover"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
        <button className="absolute bottom-4 right-4 rounded-lg bg-black/50 px-3 py-1 text-white transition hover:bg-black/70">
          <Camera size={18} className="mr-1 inline-block" /> Change Cover
        </button>
      </div>

      {/* Profile Section */}
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative -mt-16 flex items-center">
          <Image
            src={
              user?.profilePicture ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            alt="Profile"
            width={150}
            height={150}
            className="w[150px] h-[150px] rounded-full border-4 border-white object-cover shadow-lg"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.username || 'anonymous'}
            </h1>
            {editing ? (
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-64 rounded border px-2 py-1 text-sm"
                />
                <button
                  onClick={() => {
                    setBio(bioInput);
                    setEditing(false);
                  }}
                  className="text-sm text-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {bio}
                <button
                  onClick={() => setEditing(true)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Pencil size={14} />
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex border-b dark:border-gray-700">
          {['Posts', 'Friends', 'About'].map((tab) => (
            <Link
              key={tab}
              href="#"
              className="px-6 py-3 text-sm font-medium text-gray-600 transition hover:text-blue-500 dark:text-gray-400"
            >
              {tab}
            </Link>
          ))}
        </div>

        {/* Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 space-y-4"
        >
          {posts?.map((item) => (
            <Link
              href={`/posts/${item._id}`}
              key={item?._id}
              className="block rounded-lg bg-white p-4 shadow dark:bg-gray-800"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item?.title}
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {item?.description}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
