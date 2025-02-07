'use client';
import { useState } from 'react';

import UserDesktopSidebar from '../_components/DesktopSidebar';
import Drawer from '@/components/common/Drawer';
import { adminSidebarLinks } from '../_constants';
import AdminNavbar from '../_components/AdminNavbar';

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <AdminNavbar setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar with Sticky Fix */}
        <div className="hidden md:block md:w-[250px]">
          <div className="fixed bottom-0 top-[80px] h-screen overflow-y-auto border-r pl-10 pr-2 pt-5 md:w-[250px]">
            <UserDesktopSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>

      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ul className="flex flex-col gap-3 font-semibold text-gray-700">
          {adminSidebarLinks}
        </ul>
      </Drawer>
    </>
  );
}
