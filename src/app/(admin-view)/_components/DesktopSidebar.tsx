'use client';
import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';

import { FaCog, FaComments, FaEye, FaHome, FaLock } from 'react-icons/fa';

const AdminDesktopSidebar = () => {
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
      <ul className="flex flex-col gap-4 font-semibold text-gray-700">
        {links}
      </ul>
    </>
  );
};

export default AdminDesktopSidebar;
