'use client';
import { useState } from 'react';
import DesktopSidebar from './_components/DesktopSidebar';
import MobileSidebar from './_components/MobileSidebar';
import Navbar from './_components/Navbar';
import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import {
  FaBookmark,
  FaCog,
  FaCrown,
  FaEye,
  FaHome,
  FaLock,
  FaPen,
} from 'react-icons/fa';

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePremium = () => {};

  const links = (
    <>
      <p className="text-xs font-semibold uppercase opacity-50">User</p>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/user/dashboard"
        >
          <FaHome className="text-base" />
          <span className="">Dashboard</span>
        </ActiveLinkDashboard>
      </li>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/user/create-post"
        >
          <FaPen className="text-base" />
          <span className="">Create Post</span>
        </ActiveLinkDashboard>
      </li>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/user/favourite-posts"
        >
          <FaBookmark className="text-base" />
          <span className="">Favourite Posts</span>
        </ActiveLinkDashboard>
      </li>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/user/my-posts"
        >
          <FaEye className="text-base" />
          <span className="">My Posts</span>
        </ActiveLinkDashboard>
      </li>

      <li onClick={handlePremium} className="flex">
        <ActiveLinkDashboard
          btn={true}
          className="flex w-full items-center gap-2"
        >
          <FaCrown className="text-base" />
          <span className="">Be premium</span>
        </ActiveLinkDashboard>
      </li>

      <p className="text-xs font-semibold uppercase opacity-50">
        Settings
      </p>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/user/settings-profile"
        >
          <FaCog className="text-base" />
          <span className="">Update Profile</span>
        </ActiveLinkDashboard>
      </li>

      <li className="flex">
        <ActiveLinkDashboard
          className="flex w-full items-center gap-2"
          href="/user/change-password"
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
      <Navbar setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar with Sticky Fix */}
        <div className="hidden md:block md:w-[250px]">
          <div className="fixed bottom-0 top-[80px] h-screen overflow-y-auto border-r pl-10 pr-2 pt-5 md:w-[250px]">
            <DesktopSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Menu"
      >
        <ul className="flex flex-col gap-3 font-semibold text-gray-700">
          {links}
        </ul>
      </MobileSidebar>
    </>
  );
}
