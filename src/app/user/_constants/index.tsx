import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import {
  FaBookmark,
  FaCog,
  FaEye,
  FaHome,
  FaLock,
  FaNewspaper,
  FaPen,
} from 'react-icons/fa';

export const userSidebarLinks = (
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

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/posts"
      >
        <FaNewspaper className="text-base" />
        <span className="">News Feed</span>
      </ActiveLinkDashboard>
    </li>

    <p className="text-xs font-semibold uppercase opacity-50">Settings</p>

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

export const userNavbarLinks = (
  <>
    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/posts"
      >
        <FaNewspaper className="text-base" />
        <span className="">News Feed</span>
      </ActiveLinkDashboard>
    </li>
  </>
);
