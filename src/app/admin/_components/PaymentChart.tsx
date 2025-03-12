'use client';
import Chart from '@/components/common/Chart';
import { useGetPaymentStats } from '@/hooks/payment.hook';
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
// const previousYear = currentYear - 1;
interface IChartData {
  month: number;
  numberOfPayments: number;
}

const PaymentChart = () => {
  const { data: paymentStats } = useGetPaymentStats();
  const data: IChartData[] = paymentStats?.data?.map(
    (item: IChartData) => ({
      ...item,
      month: monthNames[item.month - 1],
      payments: item.numberOfPayments,
    }),
  );

  return (
    <div>
      <Chart
        title={`Payment Analytics-${currentYear}`}
        data={data}
        grid
        dataKey="payments"
      />
    </div>
  );
};

export default PaymentChart;
