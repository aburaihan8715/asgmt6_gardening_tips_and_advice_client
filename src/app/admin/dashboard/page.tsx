'use client';

import CustomPieChart from '../_components/CustomPieChart';
import PaymentCard from '../_components/PaymentCard';
import PostCard from '../_components/PostCard';
import RevenueCard from '../_components/RevenueCard';
import UserCard from '../_components/UserCard';

import LatestSubscription from '../_components/LatestSubscription';
import LatestUsers from '../_components/LatestUsers';
import Footer from '../_components/Footer';
import PostBarChart from '../_components/PostBarChart';
import UserLineChart from '../_components/UserLineChart';

const AdminDashboard = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <UserCard />
        <PostCard />
        <PaymentCard />
        <RevenueCard />
      </div>

      <div className="flex flex-col gap-10 sm:flex-row">
        <div className="flex-1 rounded p-1 shadow-md md:p-5">
          <PostBarChart />
        </div>

        <div className="flex-1 rounded p-1 shadow-md md:p-5">
          <CustomPieChart />
        </div>
      </div>

      <div className="rounded p-1 shadow-md md:p-5">
        <UserLineChart />
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        <LatestUsers />
        <LatestSubscription />
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
