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
const UserList = () => {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">User List</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center rounded-lg bg-white p-4 shadow-md"
          >
            {/* User profile picture */}
            <Image
              width={64}
              height={64}
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className="mr-4 h-16 w-16 rounded-full"
            />

            <div className="flex flex-col justify-center">
              {/* User name */}
              <h3 className="text-lg font-semibold">{user.name}</h3>

              {/* User email */}
              <p className="text-gray-600">{user.email}</p>

              {/* User type */}
              <span
                className={`mt-1 inline-block rounded-md px-2 py-1 text-xs font-semibold ${
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

export default UserList;
