'use client';
import { useState } from 'react';

import Drawer from '@/components/common/Drawer';
import { userNavbarLinks, userSidebarLinks } from './_constants';
import DesktopSidebar from '@/components/common/DesktopSidebar';
import Navbar from '@/components/common/Navbar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar setIsOpen={setIsOpen} links={userNavbarLinks} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar with Sticky Fix */}
        <div className="hidden md:block md:w-[250px]">
          <div className="fixed bottom-0 top-[80px] h-screen overflow-y-auto border-r pl-10 pr-2 pt-5 md:w-[250px]">
            <DesktopSidebar links={userSidebarLinks} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>

      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ul className="flex flex-col gap-3 font-semibold text-gray-700">
          {userSidebarLinks}
        </ul>
      </Drawer>
    </>
  );
}
