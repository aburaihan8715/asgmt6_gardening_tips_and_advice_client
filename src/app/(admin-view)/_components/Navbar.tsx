'use client';
import { logout } from '@/actions/auth.action';
import BrandLogo from '@/components/common/BrandLogo';
import LogoutButton from '@/components/common/LogoutButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/context/user.provider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MdMenu } from 'react-icons/md';

interface NavbarProps {
  setIsOpen: (isOpen: boolean) => void;
}
const AdminNavbar = ({ setIsOpen }: NavbarProps) => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky right-0 top-0 z-50 w-full bg-white px-1">
      <div className="sticky top-0 z-20 flex h-[80px] w-full items-center gap-5 border-b md:px-10">
        <div className="hidden md:block">
          <BrandLogo />
        </div>
        {/* menu button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded border border-gray-700/50 text-3xl md:hidden"
        >
          <MdMenu />
        </button>

        {/* LOGIN,PROFILE GROUP */}
        <div className="ml-auto flex items-center gap-4">
          {currentUser && (
            <div className="flex items-center">
              <ProfilePopover />
            </div>
          )}

          {currentUser && (
            <div>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

// PROFILE POPOVER COMPONENT
const ProfilePopover = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          title={currentUser?.username?.split(' ')[0]}
          className="h-10 w-10 rounded-full object-cover"
          src={
            currentUser && currentUser?.profilePicture
              ? currentUser.profilePicture
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
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
            href="/admin/dashboard"
            className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/change-password"
            className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
          >
            Change Password
          </Link>

          <Link
            href="/admin/settings-profile"
            className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
          >
            Settings Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-fit border-b-2 border-b-transparent text-left hover:border-b-2 hover:border-b-primary"
          >
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
