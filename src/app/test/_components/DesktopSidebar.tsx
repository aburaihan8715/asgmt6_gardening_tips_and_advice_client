'use client';
import ActiveLinkDashboard from '@/components/common/ActiveLinkDashboard';

import { useAuth } from '@/context/user.provider';
import { toast } from 'sonner';
import { useCheckHasUpvoteForPost } from '@/hooks/user.hook';

import {
  FaBookmark,
  FaCog,
  FaCrown,
  FaEye,
  FaHome,
  FaLock,
  FaPen,
} from 'react-icons/fa';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const DesktopSidebar = () => {
  const router = useRouter();

  const { isLoading: isUserLoading, currentUser } = useAuth();
  const { data: hasUpvoteForPostData, isLoading: isCheckUpvoteLoading } =
    useCheckHasUpvoteForPost();

  const isVerified = currentUser?.isVerified;
  const isUpvote = hasUpvoteForPostData?.data;
  const isAbleToBePremium = isUpvote && !isVerified;

  const handlePremium = async () => {
    if (isVerified) {
      return toast.warning('You already premium user!');
    }

    if (isAbleToBePremium) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'It will be charged 10 dollars!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure!',
      });

      if (result.isConfirmed) {
        router.push('/user/payment');
      }
    }
  };

  const links = (
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

      <li onClick={handlePremium} className="flex">
        <ActiveLinkDashboard
          btn={true}
          className="flex w-full items-center gap-2"
        >
          <FaCrown className="text-base" />
          <span className="">Be premium</span>
        </ActiveLinkDashboard>
      </li>

      <p className="text-xs font-semibold uppercase opacity-50">
        Settings
      </p>

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

  if (isUserLoading || isCheckUpvoteLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul className="flex flex-col gap-3 font-semibold text-gray-700">
        {links}
      </ul>
    </>
  );
};

export default DesktopSidebar;
