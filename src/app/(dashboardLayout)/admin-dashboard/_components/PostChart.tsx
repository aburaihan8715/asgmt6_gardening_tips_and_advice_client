'use client';
import Chart from '@/components/ui/Chart';
import { useGetPostStats } from '@/hooks/post.hook';
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
  numberOfPosts: number;
}

const PostChart = () => {
  const { data: postStats } = useGetPostStats();
  const data: IChartData[] = postStats?.data?.map((item: IChartData) => ({
    ...item,
    month: monthNames[item.month - 1],
    posts: item.numberOfPosts,
  }));

  return (
    <div>
      <Chart
        title={`Post Analytics-${previousYear}`}
        data={data}
        grid
        dataKey="posts"
      />
    </div>
  );
};

export default PostChart;
