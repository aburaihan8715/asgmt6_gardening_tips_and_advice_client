'use client';
import React from 'react';
import UserChart from '../_components/UserChart';
import PostChart from '../_components/PostChart';
import PaymentChart from '../_components/PaymentChart';
import PaymentCard from '../_components/PaymentCard';
import UserCard from '../_components/UserCard';
import PostCard from '../_components/PostCard';
import RevenueCard from '../_components/RevenueCard';
import { useAuth } from '@/context/user.provider';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <UserCard />
        <PostCard />
        <PaymentCard />
        <RevenueCard />
      </div>

      <div className="rounded border p-1 md:p-5">
        <div>
          <UserChart />
        </div>
      </div>

      <div className="rounded border p-1 md:p-5">
        <div>
          <PostChart />
        </div>
      </div>

      <div className="rounded border p-1 md:p-5">
        <div>
          <PaymentChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
