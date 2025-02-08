'use client';
import BrandLogo from '@/components/common/BrandLogo';
import LogoutButton from '@/components/common/LogoutButton';
import ProfilePopover from '@/components/common/ProfilePopover';

import { useAuth } from '@/context/user.provider';
import { ReactNode } from 'react';

import { MdMenu } from 'react-icons/md';

interface NavbarProps {
  setIsOpen: (isOpen: boolean) => void;
  links?: ReactNode;
}
const Navbar = ({ setIsOpen, links }: NavbarProps) => {
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

        {links && (
          <nav className="ml-auto hidden md:block">
            <ul className="flex gap-4 font-semibold text-gray-700">
              {links}
            </ul>
          </nav>
        )}

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

export default Navbar;
