'use client';
import { useState } from 'react';

import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import { FaCog, FaComments, FaEye, FaHome, FaLock } from 'react-icons/fa';
import UserNavbar from '../_components/Navbar';
import UserDesktopSidebar from '../_components/DesktopSidebar';
import UserMobileSidebar from '../_components/MobileSidebar';

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <>
      <p className="text-xs font-semibold uppercase opacity-50">Admin</p>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/admin/dashboard"
        >
          <FaHome className="text-base" />
          <span className="">Dashboard</span>
        </ActiveLinkDashboard>
      </li>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/admin/all-blogs"
        >
          <FaComments className="text-base" />
          <span className="">All Blogs</span>
        </ActiveLinkDashboard>
      </li>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/admin/all-projects"
        >
          <FaEye className="text-base" />
          <span className="">All Projects</span>
        </ActiveLinkDashboard>
      </li>

      <p className="text-xs font-semibold uppercase opacity-50">
        Settings
      </p>
      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/admin/update-profile"
        >
          <FaCog className="text-base" />
          <span className="">Update Profile</span>
        </ActiveLinkDashboard>
      </li>
      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/admin/change-password"
        >
          <FaLock className="text-base" />
          <span className="">Change password</span>
        </ActiveLinkDashboard>
      </li>
    </>
  );

  return (
    <>
      {/* Navbar */}
      <UserNavbar setIsOpen={setIsOpen} />

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
      <UserMobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ul className="flex flex-col gap-3 font-semibold text-gray-700">
          {links}
        </ul>
      </UserMobileSidebar>
    </>
  );
}
