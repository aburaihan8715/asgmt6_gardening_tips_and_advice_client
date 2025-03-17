import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import {
  FaBookmark,
  FaCog,
  FaEye,
  FaInfoCircle,
  FaNewspaper,
  FaPen,
  FaPhoneAlt,
  FaTachometerAlt,
} from 'react-icons/fa';

export const userSidebarLinks = (
  <>
    <p className="text-xs font-semibold uppercase opacity-50">User</p>

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/user/dashboard"
      >
        <FaTachometerAlt className="text-base" />
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

    {/* <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/profile"
      >
        <FaUserCircle className="text-base" />
        <span className="">Profile</span>
      </ActiveLinkDashboard>
    </li> */}
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
    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/about"
      >
        <FaInfoCircle className="text-base" />
        <span className="">About</span>
      </ActiveLinkDashboard>
    </li>
    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/contact"
      >
        <FaPhoneAlt className="text-base" />
        <span className="">Contact</span>
      </ActiveLinkDashboard>
    </li>
  </>
);
