'use client';
import React from 'react';
import Card from './Card';
import { FaCoins } from 'react-icons/fa';
import { useGetRevenue } from '@/hooks/user.hook';

const RevenueCard = () => {
  const { data, isLoading } = useGetRevenue();
  const revenueData = data?.data[0];
  const revenue = revenueData?.totalRevenue || 0;

  if (isLoading) return 'loading...';

  return <Card title="Revenue" count={revenue} icon={<FaCoins />} />;
};

export default RevenueCard;
