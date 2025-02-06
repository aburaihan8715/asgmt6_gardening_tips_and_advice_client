'use client';
import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import BrandLogo from '@/components/common/BrandLogo';
import LogoutButton from '@/components/common/LogoutButton';
import useOutsideClick from '@/hooks/outside-click.hook';
import Link from 'next/link';
import { useRef, useState } from 'react';

import {
  FaCog,
  FaComments,
  FaEye,
  FaFolderPlus,
  FaHome,
  FaLock,
  FaPen,
} from 'react-icons/fa';

import { MdClose, MdMenu } from 'react-icons/md';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outsideClickRef = useRef(null);

  // Close the menu when clicking outside
  useOutsideClick(outsideClickRef, () => setIsOpen(false));

  const menuItems = (
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
          href="/admin/create-blog"
        >
          <FaPen className="text-base" />
          <span className="">Create Blog</span>
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
          href="/admin/create-project"
        >
          <FaFolderPlus className="text-base" />
          <span className="">Create Project</span>
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
      {/* Desktop nav */}
      <nav className="hidden lg:block">
        <ul className="flex flex-col gap-2 p-8">
          <Link href={`/`}>
            <BrandLogo />
          </Link>
          <div className="mt-2 space-y-2">{menuItems}</div>
          <div className="mt-10">
            <LogoutButton />
          </div>
        </ul>
      </nav>

      {/* Mobile nav */}
      <div>
        <div className="lg:hidden">
          <div className="fixed top-0 z-20 flex h-[80px] w-full items-center justify-between bg-gray-100 px-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded border border-gray-700/50 text-3xl"
            >
              {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            <div className="">
              <LogoutButton />
            </div>
          </div>
        </div>

        <nav className="lg:hidden">
          <ul
            ref={outsideClickRef}
            className={`fixed top-[80px] z-50 flex h-full w-[280px] flex-col gap-2 overflow-y-auto bg-gray-100 pl-8 pr-3 pt-5 transition-transform duration-500 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {menuItems}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;

/*
{user && user?.role === 'admin' && (
        <ul className="flex flex-col gap-4">
          <li className="flex">
            <ActiveLinkDashboard
              className="flex items-center gap-2"
              href="/admin/dashboard"
            >
              <FaHome className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Dashboard</span>
            </ActiveLinkDashboard>
          </li>
          <li className="flex">
            <ActiveLinkDashboard
              className="flex items-center gap-2"
              href="/auth/change-password"
            >
              <FaLock className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Change Password</span>
            </ActiveLinkDashboard>
          </li>

          <li className="flex">
            <ActiveLinkDashboard
              className="flex items-center gap-2"
              href="/auth/settings-profile"
            >
              <FaCog className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Settings Profile</span>
            </ActiveLinkDashboard>
          </li>

          <li className="flex">
            <ActiveLinkDashboard
              className="flex items-center gap-2"
              href="/admin/all-posts"
            >
              <FaFileAlt className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">All Posts</span>
            </ActiveLinkDashboard>
          </li>

          <li className="flex">
            <ActiveLinkDashboard
              className="flex items-center gap-2"
              href="/admin/all-users"
            >
              <FaFileAlt className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">All Users</span>
            </ActiveLinkDashboard>
          </li>
        </ul>
      )}
*/
