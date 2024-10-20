'use client';
import ActiveLink from '@/components/ui/ActiveLink';
import { useAuth } from '@/context/user.provider';
import { useCheckPremiumStatus } from '@/hooks/user.hook';
import {
  FaArrowLeft,
  FaCog,
  FaDollarSign,
  FaFileAlt,
  FaHeart,
  FaHome,
  FaLock,
  FaPlus,
} from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useAuth();
  const { data: premiumStatusData } = useCheckPremiumStatus();
  const isAbleForPremium = premiumStatusData?.data;
  const favourite = user?.favourites || [];
  const hasFavourite = favourite.length > 0;

  return (
    <nav>
      {/* ADMIN ROUTES */}
      {user && user?.role === 'admin' && (
        <ul className="flex flex-col gap-4">
          <li className="flex">
            <ActiveLink className="flex items-center gap-2" href="/">
              <FaArrowLeft className="text-2xl md:text-base" />
              <span className="hidden md:block">Back</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/admin-dashboard"
            >
              <FaHome className="text-2xl md:text-base" />
              <span className="hidden md:block">Admin Home</span>
            </ActiveLink>
          </li>
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/profile/change-password"
            >
              <FaLock className="text-2xl md:text-base" />
              <span className="hidden md:block">Change Password</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/profile/settings-profile"
            >
              <FaCog className="text-2xl md:text-base" />
              <span className="hidden md:block">Settings Profile</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/admin-dashboard/all-posts"
            >
              <FaFileAlt className="text-2xl md:text-base" />
              <span className="hidden md:block">All Posts</span>
            </ActiveLink>
          </li>
        </ul>
      )}

      {/* USER ROUTES */}
      {user && user.role === 'user' && (
        <ul className="flex flex-col gap-4">
          <li className="flex">
            <ActiveLink className="flex items-center gap-2" href="/">
              <FaArrowLeft className="text-2xl md:text-base" />
              <span className="hidden md:block">Back</span>
            </ActiveLink>
          </li>
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/user-dashboard"
            >
              <FaHome className="text-2xl md:text-base" />
              <span className="hidden md:block">User Home</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/profile/change-password"
            >
              <FaLock className="text-2xl md:text-base" />
              <span className="hidden md:block">Change Password</span>
            </ActiveLink>
          </li>
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/profile/settings-profile"
            >
              <FaCog className="text-2xl md:text-base" />
              <span className="hidden md:block">Settings Profile</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/user-dashboard/create-post"
            >
              <FaPlus className="text-2xl md:text-base" />
              <span className="hidden md:block">Create Post</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/user-dashboard/my-posts"
            >
              <FaFileAlt className="text-2xl md:text-base" />
              <span className="hidden md:block">My Posts</span>
            </ActiveLink>
          </li>

          {hasFavourite && (
            <li className="flex">
              <ActiveLink
                className="flex items-center gap-2"
                href="/user-dashboard/favourite-posts"
              >
                <FaHeart className="text-2xl text-red-600 md:text-base" />
                <span className="hidden md:block">Favourite Posts</span>
              </ActiveLink>
            </li>
          )}

          {isAbleForPremium && (
            <li className="flex">
              <ActiveLink
                className="flex items-center gap-2"
                href="/user-dashboard/payment"
              >
                <FaDollarSign className="text-2xl md:text-base" />
                <span className="hidden md:block">Be premium</span>
              </ActiveLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
