'use client';
import React from 'react';
import { FaCoins } from 'react-icons/fa';
import { useGetRevenue } from '@/hooks/user.hook';
import InfoCard from './InfoCard';
import CustomSkeleton from '@/components/common/CustomSkeleton';

const RevenueCard = () => {
  const { data, isLoading } = useGetRevenue();
  const revenueData = data?.data[0];
  const revenue = revenueData?.totalRevenue || 0;

  if (isLoading) {
    return <CustomSkeleton type="card" />;
  }

  return (
    <InfoCard
      bg="bg-orange-100"
      title="Revenue"
      count={revenue}
      icon={<FaCoins />}
    />
  );
};

export default RevenueCard;
