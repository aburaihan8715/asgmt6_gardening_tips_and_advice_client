'use client';
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { useGetAllPayments } from '@/hooks/payment.hook';
import InfoCard from './InfoCard';

const PaymentCard = () => {
  const { data, isLoading } = useGetAllPayments({});
  const payments = data?.data || [];
  const count = payments.length || 0;

  if (isLoading) return 'loading...';

  return (
    <InfoCard
      bg="bg-yellow-100"
      title="Payments"
      count={count}
      icon={<FaWallet />}
    />
  );
};

export default PaymentCard;
