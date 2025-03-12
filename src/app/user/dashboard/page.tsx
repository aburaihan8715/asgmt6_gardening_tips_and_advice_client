'use client';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import SectionHeading from '@/components/common/SectionHeading';
import { useAuth } from '@/context/user.provider';
import Image from 'next/image';

const UserDashboard = () => {
  const { currentUser, isCurrentUserLoading } = useAuth();

  return (
    <>
      {isCurrentUserLoading && <LoadingWithOverlay />}
      <div className="flex h-full items-center justify-center">
        <div className="mt-4 flex justify-center">
          <div>
            <div>
              <div className="mb-10 flex justify-center">
                <SectionHeading
                  heading={`Welcome ${currentUser?.username || 'Anonymous'}`}
                />
              </div>

              <div className="relative h-[200px] w-[200px] rounded-full object-cover md:h-[400px] md:w-[400px]">
                <Image
                  fill
                  src={
                    currentUser?.profilePicture
                      ? currentUser?.profilePicture
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={`${currentUser?.username}`}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
