import React from 'react';
import ActiveLinkDashboard from './ActiveLinkDashboard';
import { FaCrown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/user.provider';
import { useCheckHasUpvoteForPost } from '@/hooks/user.hook';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const PremiumButton = () => {
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

  if (isUserLoading || isCheckUpvoteLoading) {
    return <p>Loading...</p>;
  }

  return (
    <li onClick={handlePremium} className="flex">
      <ActiveLinkDashboard
        btn={true}
        className="flex w-full items-center gap-2"
      >
        <FaCrown className="text-base" />
        <span className="">Be premium</span>
      </ActiveLinkDashboard>
    </li>
  );
};

export default PremiumButton;
