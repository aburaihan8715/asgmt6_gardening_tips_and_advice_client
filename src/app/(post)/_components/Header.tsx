'use client';

import { useRef, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import Image from 'next/image';
import BrandLogo from '../../../components/common/BrandLogo';
import { MdClose, MdMenu } from 'react-icons/md';
import ActiveLink from '../../../components/common/ActiveLink';
import { useAuth } from '@/context/user.provider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/actions/auth.action';
import Container from '../../../components/common/Container';
import useOutsideClick from '@/hooks/outside-click.hook';
import LogoutButton from '../../../components/common/LogoutButton';

// HEADER COMPONENT
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const outsideClickRef = useRef(null);
  // Close the menu when clicking outside
  useOutsideClick(outsideClickRef, () => setIsOpen(false));

  // const router = useRouter();
  const links = (
    <>
      <li>
        <ActiveLink href="/posts">News Feed</ActiveLink>
      </li>
      <li>
        <ActiveLink href="/about">About Us</ActiveLink>
      </li>
      <li>
        <ActiveLink href="/contact">Contact Us</ActiveLink>
      </li>

      <li>
        {currentUser && currentUser.role === 'user' && (
          <ActiveLink href={`/user/dashboard`}>Dashboard</ActiveLink>
        )}
        {currentUser && currentUser.role === 'admin' && (
          <ActiveLink href={`/admin/dashboard`}>Dashboard</ActiveLink>
        )}
      </li>
    </>
  );

  return (
    <>
      <header className="sticky right-0 top-0 z-50 w-full bg-white px-1">
        <Container>
          <div className="sticky top-0 z-20 flex h-[80px] w-full items-center gap-5 border-b">
            <div className="hidden md:block">
              <BrandLogo />
            </div>
            {/* menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded border border-gray-700/50 text-3xl md:hidden"
            >
              {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            <nav className="ml-auto hidden md:block">
              <ul className="flex gap-4 font-semibold text-gray-700">
                {links}
              </ul>
            </nav>

            {/* LOGIN,PROFILE GROUP */}
            <div className="ml-auto flex items-center gap-4 md:ml-0">
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
        </Container>
      </header>

      {/* sidebar */}
      <ul
        ref={outsideClickRef}
        className={`fixed top-[80px] z-50 flex h-full w-[200px] flex-col gap-2 overflow-y-auto bg-gray-200/95 pl-8 pr-3 pt-5 transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {links}
      </ul>
    </>
  );
};

export default Header;

// PROFILE POPOVER COMPONENT
const ProfilePopover = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/Resources');
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

        {currentUser && currentUser.role === 'admin' && (
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/dashboard"
              className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
            >
              Dashboard
            </Link>

            <Link
              href="/auth/change-password"
              className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
            >
              Change Password
            </Link>

            <Link
              href="/auth/settings-profile"
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
        )}

        {currentUser && currentUser.role === 'user' && (
          <div className="flex flex-col gap-2">
            <Link
              href="/user/dashboard"
              className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
            >
              Dashboard
            </Link>

            <Link
              href="/auth/change-password"
              className="w-fit border-b-2 border-b-transparent hover:border-b-2 hover:border-b-primary"
            >
              Change Password
            </Link>

            <Link
              href="/auth/settings-profile"
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
        )}
      </PopoverContent>
    </Popover>
  );
};
