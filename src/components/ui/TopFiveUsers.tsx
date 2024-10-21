'use client';
import Image from 'next/image';
import React from 'react';

// Define the user type
type User = {
  id: number;
  name: string;
  email: string;
  userType: 'Basic' | 'Premium';
  profilePicture: string;
};

// Dummy user data
const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    userType: 'Premium',
    profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    userType: 'Basic',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Clara Bennett',
    email: 'clara.bennett@example.com',
    userType: 'Premium',
    profilePicture: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: 4,
    name: 'David West',
    email: 'david.west@example.com',
    userType: 'Basic',
    profilePicture: 'https://randomuser.me/api/portraits/men/28.jpg',
  },
];

// UserList component
const TopFiveUsers = () => {
  return (
    <div className="rounded p-1">
      <h5 className="mb-4 font-bold">Top Users</h5>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center rounded border bg-white p-2"
          >
            {/* User profile picture */}
            <Image
              width={40}
              height={40}
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className="mr-4 h-10 w-10 rounded-full"
            />

            <div className="flex flex-col justify-center">
              {/* User name */}
              <h3 className="text-lg font-semibold">{user.name}</h3>

              {/* User email */}
              <p className="text-gray-600">{user.email}</p>

              {/* User type */}
              <span
                className={`mt-1 inline-block w-fit rounded-md px-2 py-1 text-xs font-semibold ${
                  user.userType === 'Premium'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {user.userType}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFiveUsers;
