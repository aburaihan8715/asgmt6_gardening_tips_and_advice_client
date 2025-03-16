import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import {
  FaCog,
  FaMoneyBillWave,
  FaRegNewspaper,
  FaTachometerAlt,
  FaUserCircle,
  FaUsers,
} from 'react-icons/fa';

export const adminSidebarLinks = (
  <>
    <p className="text-xs font-semibold uppercase opacity-50">Admin</p>

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/admin/dashboard"
      >
        <FaTachometerAlt className="text-base" />
        <span className="">Dashboard</span>
      </ActiveLinkDashboard>
    </li>

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/admin/all-posts"
      >
        <FaRegNewspaper className="text-base" />
        <span className="">Posts</span>
      </ActiveLinkDashboard>
    </li>

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/admin/all-users"
      >
        <FaUsers className="text-base" />
        <span className="">Users</span>
      </ActiveLinkDashboard>
    </li>

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/admin/all-payments"
      >
        <FaMoneyBillWave className="text-base" />
        <span className="">Payments</span>
      </ActiveLinkDashboard>
    </li>

    <p className="text-xs font-semibold uppercase opacity-50">Settings</p>
    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/settings"
      >
        <FaCog className="text-base" />
        <span className="">Profile settings</span>
      </ActiveLinkDashboard>
    </li>
    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/profile"
      >
        <FaUserCircle className="text-base" />
        <span className="">Profile</span>
      </ActiveLinkDashboard>
    </li>
  </>
);
