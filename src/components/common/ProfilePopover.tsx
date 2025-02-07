import { useAuth } from '@/context/user.provider';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const ProfilePopover = () => {
  const { currentUser, isCurrentUserLoading } = useAuth();

  if (isCurrentUserLoading) {
    return 'Loading...';
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          title={currentUser?.username?.split(' ')[0]}
          className="h-10 w-10 rounded-full object-cover"
          src={
            currentUser?.profilePicture ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={40}
          height={40}
          alt=""
        />
      </PopoverTrigger>

      <PopoverContent className="mt-5 md:mr-[20px]">
        <h4 className="text-lg font-semibold">My account</h4>
        <hr className="my-2 border-gray-300" />

        <div className="flex flex-col gap-2">
          <Link
            href={`/${currentUser?.role}/dashboard`}
            className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
          >
            Dashboard
          </Link>

          <Link
            href={`/${currentUser?.role}/change-password`}
            className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
          >
            Change Password
          </Link>

          <Link
            href={`/${currentUser?.role}/settings-profile`}
            className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
          >
            Settings Profile
          </Link>

          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
