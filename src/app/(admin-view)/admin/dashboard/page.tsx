import React from 'react';
import UserChart from '../../../../components/admin-view/UserChart';
import PostChart from '../../../../components/admin-view/PostChart';
import PaymentChart from '../../../../components/admin-view/PaymentChart';
import PaymentCard from '../../../../components/admin-view/PaymentCard';
import UserCard from '../../../../components/admin-view/UserCard';
import PostCard from '../../../../components/admin-view/PostCard';
import RevenueCard from '../../../../components/admin-view/RevenueCard';

const AdminDashboard = () => {
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
