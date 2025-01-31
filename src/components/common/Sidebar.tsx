'use client';
import ActiveLink from '@/components/common/ActiveLink';
import { useAuth } from '@/context/user.provider';
import { useCheckPremiumStatus } from '@/hooks/user.hook';

import {
  FaCog,
  FaDollarSign,
  FaFileAlt,
  FaHeart,
  FaHome,
  FaLock,
  FaPlus,
} from 'react-icons/fa';

const Sidebar = () => {
  const { user, isLoading: isUserLoading } = useAuth();

  const { data: premiumStatusData, isLoading: statusLoading } =
    useCheckPremiumStatus();

  const isVerified = user?.isVerified;
  const hasPremiumStatus = premiumStatusData?.data;
  const isAbleToBePremiumRequest = hasPremiumStatus && !isVerified;

  const favourite = user?.favourites || [];
  const hasFavourite = favourite.length > 0;

  if (isUserLoading || statusLoading) {
    return <p>Loading...</p>;
  }
  return (
    <nav>
      {/* ADMIN ROUTES */}
      {user && user?.role === 'admin' && (
        <ul className="flex flex-col gap-4">
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/admin/dashboard"
            >
              <FaHome className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Dashboard</span>
            </ActiveLink>
          </li>
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/auth/change-password"
            >
              <FaLock className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Change Password</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/auth/settings-profile"
            >
              <FaCog className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Settings Profile</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/admin/all-posts"
            >
              <FaFileAlt className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">All Posts</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/admin/all-users"
            >
              <FaFileAlt className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">All Users</span>
            </ActiveLink>
          </li>
        </ul>
      )}

      {/* USER ROUTES */}
      {user && user.role === 'user' && (
        <ul className="flex flex-col gap-4">
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/user/dashboard"
            >
              <FaHome className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Dashboard</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/auth/change-password"
            >
              <FaLock className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Change Password</span>
            </ActiveLink>
          </li>
          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/auth/settings-profile"
            >
              <FaCog className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Settings Profile</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/user/create-post"
            >
              <FaPlus className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">Create Post</span>
            </ActiveLink>
          </li>

          <li className="flex">
            <ActiveLink
              className="flex items-center gap-2"
              href="/user/my-posts"
            >
              <FaFileAlt className="text-2xl text-gray-600 md:text-base" />
              <span className="hidden md:block">My Posts</span>
            </ActiveLink>
          </li>

          {hasFavourite && (
            <li className="flex">
              <ActiveLink
                className="flex items-center gap-2"
                href="/auth/favourite-posts"
              >
                <FaHeart className="text-2xl text-gray-600 md:text-base" />
                <span className="hidden md:block">Favourite Posts</span>
              </ActiveLink>
            </li>
          )}

          {isAbleToBePremiumRequest ? (
            <li
              onClick={() => alert('Ten dolors will be charged!!')}
              className="flex"
            >
              <ActiveLink
                href="/payment"
                className="flex items-center gap-2"
              >
                <FaDollarSign className="text-2xl text-gray-600 md:text-base" />
                <span className="hidden md:block">Be premium</span>
              </ActiveLink>
            </li>
          ) : (
            <li
              onClick={() => alert('Already premium user!!')}
              className="flex"
            >
              <ActiveLink href="#" className="flex items-center gap-2">
                <FaDollarSign className="text-2xl text-gray-600 md:text-base" />
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
