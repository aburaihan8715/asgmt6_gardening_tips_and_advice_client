'use client';
import { useGetTopFiveUsers } from '@/hooks/user.hook';
import { IUser } from '@/types';
import Image from 'next/image';
import React from 'react';

const TopFiveUsers = () => {
  const { data: userData, isLoading } = useGetTopFiveUsers();
  const users = userData?.data || [];

  return (
    <div className="rounded p-1">
      <h5 className="mb-4 font-bold">Top Users</h5>
      <ul className="space-y-4">
        {isLoading && <p>Loading...</p>}
        {users?.slice(0, 3)?.map((user: IUser) => (
          <li
            key={user?._id}
            className="flex items-center rounded border bg-white p-2"
          >
            {/* User profile picture */}
            <Image
              width={40}
              height={40}
              src={`${user?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}`}
              alt={`${user?.username}'s profile`}
              className="mr-4 h-10 w-10 rounded-full"
            />

            <div className="flex flex-col justify-center">
              {/* User name */}
              <h3 className="text-lg font-semibold">{user?.username}</h3>

              {/* User email */}
              <p className="text-gray-600">{user.email}</p>

              {/* User type */}
              <span
                className={`mt-1 inline-block w-fit rounded-md px-2 py-1 text-xs font-semibold ${
                  user.isVerified
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {user?.isVerified ? 'PREMIUM' : 'BASIC'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFiveUsers;
