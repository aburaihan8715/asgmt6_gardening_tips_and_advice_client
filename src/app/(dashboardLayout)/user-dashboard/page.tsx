'use client';
import SectionHeading from '@/components/ui/SectionHeading';
import { useAuth } from '@/context/user.provider';
import Image from 'next/image';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        {/* <h1 className="text-center text-2xl font-semibold md:text-4xl">
          Welcome {user?.username}
        </h1> */}

        <SectionHeading
          heading={`Welcome ${user?.username || 'Anonymous'}`}
        />
        <div className="mt-4 flex justify-center">
          <div className="relative mr-3 h-[200px] w-[200px] rounded-full object-cover">
            <Image
              fill
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={`${user?.username}`}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
