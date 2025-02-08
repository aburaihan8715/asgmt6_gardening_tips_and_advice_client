'use client';

import { useState } from 'react';

import BrandLogo from '../../../components/common/BrandLogo';
import { MdMenu } from 'react-icons/md';
import { useAuth } from '@/context/user.provider';

import Container from '../../../components/common/Container';
import LogoutButton from '../../../components/common/LogoutButton';
import Drawer from '@/components/common/Drawer';
import ProfilePopover from '@/components/common/ProfilePopover';
import { postNavbarLinks } from '../_constants';

// HEADER COMPONENT
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <header className="sticky right-0 top-0 z-50 w-full border-b bg-white px-1">
        <Container>
          <div className="sticky top-0 z-20 flex h-[80px] w-full items-center gap-5">
            <div className="hidden md:block">
              <BrandLogo />
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
                {postNavbarLinks}
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
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ul className="flex flex-col gap-2">{postNavbarLinks}</ul>
      </Drawer>
    </>
  );
};

export default Header;
