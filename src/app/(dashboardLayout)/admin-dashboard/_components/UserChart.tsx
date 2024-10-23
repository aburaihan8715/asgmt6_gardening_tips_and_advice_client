'use client';
import Chart from '@/components/ui/Chart';
import { useGetUserStats } from '@/hooks/user.hook';
import React from 'react';

const monthNames = [
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

const date = new Date();
const currentYear = date.getFullYear();
const previousYear = currentYear - 1;
interface IChartData {
  month: number;
  numberOfUsers: number;
}

const UserChart = () => {
  const { data: userStats } = useGetUserStats();
  const data: IChartData[] = userStats?.data?.map((item: IChartData) => ({
    ...item,
    month: monthNames[item.month - 1],
    users: item.numberOfUsers,
  }));

  return (
    <div>
      <Chart
        title={`User Analytics-${previousYear}`}
        data={data}
        grid
        dataKey="users"
      />
    </div>
  );
};

export default UserChart;
