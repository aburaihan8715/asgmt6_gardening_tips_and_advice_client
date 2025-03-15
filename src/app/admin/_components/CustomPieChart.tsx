import { useGetAllPayments } from '@/hooks/payment.hook';
import { useGetAllPosts } from '@/hooks/post.hook';
import { useGetAllUsers } from '@/hooks/user.hook';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const date = new Date();
const currentYear = date.getFullYear();

const CustomPieChart = () => {
  const { data: userData, isLoading: isUserLoading } = useGetAllUsers({});
  const users = userData?.data || [];
  const userCount = users.length || 0;

  const { data: postData, isLoading: isPostLoading } = useGetAllPosts({});
  const posts = postData?.data || [];
  const postCount = posts.length || 0;

  const { data: paymentData, isLoading: isPaymentLoading } =
    useGetAllPayments({});
  const payments = paymentData?.data || [];
  const paymentCount = payments.length || 0;

  const data = [
    { name: 'Users', value: userCount, color: '#0088FE' },
    { name: 'Posts', value: postCount, color: '#00C49F' },
    { name: 'Payments', value: paymentCount, color: '#FF8042' },
  ];

  if (isUserLoading || isPaymentLoading || isPostLoading) {
    return 'loading...';
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-medium text-gray-700">
        Summary - {currentYear}
      </h2>
      <div>
        <ResponsiveContainer width="99%" height={200}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: 'white', borderRadius: '5px' }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-10">
        {data.map((item) => (
          <div className="" key={item.name}>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name}</span>
            </div>
            <span className="">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
