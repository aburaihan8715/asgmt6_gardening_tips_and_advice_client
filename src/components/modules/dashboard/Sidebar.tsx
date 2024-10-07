'use client';
import ActiveLink from '@/components/ui/ActiveLink';
import { useUser } from '@/context/user.provider';
import { FaArrowLeft, FaCog, FaHome, FaLock } from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useUser();
  // console.log(user);
  return (
    <nav>
      {/* ADMIN ROUTES */}
      {user && user?.role === 'ADMIN' && (
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
        </ul>
      )}

      {/* USER ROUTES */}
      {user && user.role === 'USER' && (
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
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
