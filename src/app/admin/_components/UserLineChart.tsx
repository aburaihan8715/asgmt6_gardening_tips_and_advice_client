import { useGetUserStats } from '@/hooks/user.hook';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

interface IUserStats {
  month: number;
  numberOfUsers: number;
}

const date = new Date();
const currentYear = date.getFullYear();
const UserLineChart = () => {
  const { data: userStats, isLoading: isUserLoading } = useGetUserStats();
  const totalUsers = userStats?.data || [];

  const modifiedTotalUsers = months.map((name, index) => {
    const found = totalUsers.find(
      (item: IUserStats) => Number(item.month) === index + 1,
    );
    return {
      name,
      users: found ? found.numberOfUsers : 0, // Default to 0 if no data exists
    };
  });

  if (isUserLoading) {
    return 'loading...';
  }
  return (
    <div className="">
      <h2 className="mb-2 text-2xl font-medium text-gray-700">
        User analytics - {currentYear}
      </h2>
      <ResponsiveContainer width="99%" aspect={4 / 1}>
        <LineChart data={modifiedTotalUsers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserLineChart;
