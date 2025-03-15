import React from 'react';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { useGetFiveNewUsers } from '@/hooks/user.hook';

import { format, parseISO } from 'date-fns';
import { IUser } from '@/types/user.type';
import Link from 'next/link';
import { useAuth } from '@/context/user.provider';

const LatestUsers = () => {
  const { data, isLoading } = useGetFiveNewUsers();
  const users = data?.data || [];
  const { currentUser, isCurrentUserLoading } = useAuth();

  if (isLoading || isCurrentUserLoading) return 'loading...';
  return (
    <div className="rounded-md p-1 shadow-md md:p-5">
      <h2 className="mb-5 text-2xl font-medium text-gray-700">
        Latest users
      </h2>
      <div className="space-y-4">
        {users?.map((item: IUser) => (
          <div key={item._id} className="flex items-center gap-5">
            <Image
              className="h-10 w-10 rounded-full object-cover"
              src={
                item.profilePicture ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={40}
              height={40}
              alt="Profile image"
            />

            <div className="flex flex-col">
              <span className="font-medium">{item?.username}</span>
              <span className="text-xs">
                Joined_
                {format(parseISO(`${item?.createdAt}`), 'dd-MM-yyyy')}
              </span>
            </div>

            <Link
              href={`/${currentUser?.role}/profile`}
              className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-1"
            >
              <EyeIcon size={16} />
              view
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUsers;
