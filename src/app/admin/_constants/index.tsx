import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import { FaCog, FaComments, FaEye, FaHome, FaLock } from 'react-icons/fa';

export const adminSidebarLinks = (
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
        href="/admin/all-posts"
      >
        <FaComments className="text-base" />
        <span className="">All Posts</span>
      </ActiveLinkDashboard>
    </li>

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/admin/all-users"
      >
        <FaEye className="text-base" />
        <span className="">All Users</span>
      </ActiveLinkDashboard>
    </li>

    <p className="text-xs font-semibold uppercase opacity-50">Settings</p>
    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/admin/settings-profile"
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
