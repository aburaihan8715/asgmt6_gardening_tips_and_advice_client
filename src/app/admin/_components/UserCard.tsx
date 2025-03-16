'use client';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { useGetAllUsers } from '@/hooks/user.hook';
import InfoCard from './InfoCard';
import CustomSkeleton from '@/components/common/CustomSkeleton';

const UserCard = () => {
  const { data, isLoading } = useGetAllUsers({});
  const users = data?.data || [];
  const count = users.length || 0;

  if (isLoading) {
    return <CustomSkeleton type="card" />;
  }
  return (
    <InfoCard
      bg="bg-green-100"
      title="Users"
      count={count}
      icon={<FaUsers />}
    />
  );
};

export default UserCard;
