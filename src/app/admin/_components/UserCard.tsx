'use client';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { useGetAllUsers } from '@/hooks/user.hook';
import InfoCard from './InfoCard';

const UserCard = () => {
  const { data, isLoading } = useGetAllUsers({});
  const users = data?.data || [];
  const count = users.length || 0;

  if (isLoading) return 'loading...';
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
