import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';
import {
  FaNewspaper,
  FaPhoneAlt,
  FaInfoCircle,
  FaTachometerAlt,
} from 'react-icons/fa';

export const postLinks = (
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

    <li className="flex">
      <ActiveLinkDashboard
        className="flex w-full items-center gap-2"
        href="/user/dashboard"
      >
        <FaTachometerAlt className="text-base" />
        <span className="">Dashboard</span>
      </ActiveLinkDashboard>
    </li>
  </>
);
