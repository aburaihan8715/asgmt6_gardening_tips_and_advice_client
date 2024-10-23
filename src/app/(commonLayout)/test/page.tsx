'use client';
import { useGetAllPayments } from '@/hooks/payment.hook';
import React from 'react';

const Test = () => {
  const { data, isLoading } = useGetAllPayments();

  if (isLoading) return 'Loading...';
  console.log(data?.data);
  return <div>Test</div>;
};

export default Test;
