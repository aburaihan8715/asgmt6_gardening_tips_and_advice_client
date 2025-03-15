import { useGetPostStats } from '@/hooks/post.hook';
import React from 'react';
import {
  Bar,
  BarChart,
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

const date = new Date();
const currentYear = date.getFullYear();

interface IPostStats {
  month: number;
  numberOfPosts: number;
}

const PostBarChart = () => {
  const { data: postStats, isLoading: isPostLoading } = useGetPostStats();
  const totalPosts = postStats?.data || [];

  const modifiedTotalPosts = months.map((name, index) => {
    const found = totalPosts.find(
      (item: IPostStats) => Number(item.month) === index + 1,
    );
    return {
      name,
      posts: found ? found.numberOfPosts : 0, // Default to 0 if no data exists
    };
  });

  if (isPostLoading) {
    return 'loading...';
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-medium text-gray-700">
        Total Posts - {currentYear}
      </h2>

      <ResponsiveContainer width="99%" height={250}>
        <BarChart data={modifiedTotalPosts}>
          <Tooltip
            contentStyle={{ background: 'white', borderRadius: '5px' }}
          />
          <Bar dataKey="posts" fill="#8884d8" />
          <XAxis dataKey="name" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostBarChart;
