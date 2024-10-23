'use client';
import React from 'react';
import Card from './Card';
import { FaUsers } from 'react-icons/fa';
import { useGetAllUsers } from '@/hooks/user.hook';

const UserCard = () => {
  const { data, isLoading } = useGetAllUsers();
  const users = data?.data || [];
  const count = users.length || 0;

  if (isLoading) return 'loading...';
  return <Card title="Users" count={count} icon={<FaUsers />} />;
};

export default UserCard;
