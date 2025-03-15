import {
  createPayment,
  createPaymentIntent,
  getAllPayments,
  getNewFivePayments,
  getPaymentStats,
} from '@/actions/payment.action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface intentArgs {
  price: number;
}

export const useGetAllPayments = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['PAYMENTS', { page, limit }],
    queryFn: async () => await getAllPayments({ page, limit }),
  });
};

export const useGetNewFivePayments = () => {
  return useQuery({
    queryKey: ['NEW_PAYMENTS'],
    queryFn: async () => await getNewFivePayments(),
  });
};

export const useGetPaymentStats = () => {
  return useQuery({
    queryKey: ['PAYMENT-STATS'],
    queryFn: async () => await getPaymentStats(),
  });
};

export const useCreatePaymentIntentMutation = () => {
  return useMutation<any, Error, intentArgs>({
    mutationFn: async (intentData) =>
      await createPaymentIntent(intentData),
    onSuccess: () => {
      toast.success('Payment intent created successfully!!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create intent');
    },
  });
};

export const useCreatePaymentMutation = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (paymentData) => await createPayment(paymentData),
    onSuccess: () => {
      toast.success('Now you are premium user!!');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
