'use client';

import { useState } from 'react';

import BrandLogo from '../../../components/common/BrandLogo';
import { MdMenu } from 'react-icons/md';
import { useAuth } from '@/context/user.provider';

import LogoutButton from '../../../components/common/LogoutButton';
import Drawer from '@/components/common/Drawer';
import ProfilePopover from '@/components/common/ProfilePopover';

import Link from 'next/link';
import { mainLayoutLinks } from '../_constants';

// HEADER COMPONENT
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  console.log('currentUser from header', currentUser);

  return (
    <>
      <header className="sticky right-0 top-0 z-50 w-full border-b bg-white px-1 sm:px-10">
        <div>
          <div className="sticky top-0 z-20 flex h-[70px] w-full items-center gap-5">
            <div className="hidden md:block">
              <Link href={`/`}>
                <BrandLogo />
              </Link>
            </div>
            {/* menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded border border-gray-700/50 text-3xl md:hidden"
            >
              <MdMenu />
            </button>

            <nav className="ml-auto hidden md:block">
              <ul className="flex gap-4 font-semibold text-gray-700">
                {mainLayoutLinks}
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
        </div>
      </header>

      {/* sidebar */}
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Posts"
      >
        <ul className="flex flex-col gap-2">{mainLayoutLinks}</ul>
      </Drawer>
    </>
  );
};

export default Header;
