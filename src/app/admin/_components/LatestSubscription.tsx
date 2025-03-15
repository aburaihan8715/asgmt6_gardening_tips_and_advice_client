import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetNewFivePayments } from '@/hooks/payment.hook';
import { IPayment } from '@/types/payment.type';
import { parseISO, format } from 'date-fns';

const LatestSubscription = () => {
  const { data: paymentData, isLoading } = useGetNewFivePayments();
  const latestPayments = paymentData?.data || [];

  if (isLoading) return 'loading...';
  return (
    <div className="flex-1 rounded-md p-1 shadow-md md:p-5">
      <h2 className="mb-2 text-2xl font-medium text-gray-700">
        Latest subscriptions
      </h2>

      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User</TableHead>
              <TableHead>Transaction id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestPayments?.map((item: IPayment) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.email}</TableCell>
                <TableCell>{item.transactionId}</TableCell>
                <TableCell>
                  {format(parseISO(`${item?.createdAt}`), 'dd-MM-yyyy')}
                </TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LatestSubscription;
