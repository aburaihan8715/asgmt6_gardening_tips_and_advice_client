'use client';
import React from 'react';
import Card from './Card';
import { FaDollarSign } from 'react-icons/fa';
import { useGetAllPayments } from '@/hooks/payment.hook';

const PaymentCard = () => {
  const { data, isLoading } = useGetAllPayments();
  const payments = data?.data || [];
  const count = payments.length || 0;

  if (isLoading) return 'loading...';

  return <Card title="Payments" count={count} icon={<FaDollarSign />} />;
};

export default PaymentCard;
