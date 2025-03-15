import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface IProps {
  title: string;
  data: any;
  dataKey: string;
  grid: boolean;
}

export default function Chart({ title, data, dataKey, grid }: IProps) {
  return (
    <div className="">
      <h2 className="mb-2 text-2xl font-medium text-gray-700">{title}</h2>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && (
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
