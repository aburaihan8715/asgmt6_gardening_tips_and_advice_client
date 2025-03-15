// 'use client';
// import React from 'react';
// import UserChart from '../_components/UserChart';
// import PostChart from '../_components/PostChart';
// import PaymentChart from '../_components/PaymentChart';
// import PaymentCard from '../_components/PaymentCard';
// import UserCard from '../_components/UserCard';
// import PostCard from '../_components/PostCard';
// import RevenueCard from '../_components/RevenueCard';
// import { useAuth } from '@/context/user.provider';

// const AdminDashboard = () => {
//   const { currentUser } = useAuth();

//   if (!currentUser) {
//     return null;
//   }
//   return (
//     <div className="space-y-5">
//       <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
//         <UserCard />
//         <PostCard />
//         <PaymentCard />
//         <RevenueCard />
//       </div>

//       <div className="rounded border p-1 md:p-5">
//         <div>
//           <UserChart />
//         </div>
//       </div>

//       <div className="rounded border p-1 md:p-5">
//         <div>
//           <PostChart />
//         </div>
//       </div>

//       <div className="rounded border p-1 md:p-5">
//         <div>
//           <PaymentChart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

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

      <div className="flex gap-10">
        <LatestUsers />
        <LatestSubscription />
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
