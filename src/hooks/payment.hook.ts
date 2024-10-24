import {
  createPayment,
  createPaymentIntent,
  getAllPayments,
  getPaymentStats,
} from '@/actions/payment.action';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

// =========INFO: Query ===========

// GET ALL PAYMENTS
export const useGetAllPayments = () => {
  return useQuery({
    queryKey: ['GET_PAYMENTS'],
    queryFn: async () => await getAllPayments(),
  });
};

// GET PAYMENT STATS
export const useGetPaymentStats = () => {
  return useQuery({
    queryKey: ['GET_PAYMENT-STATS'],
    queryFn: async () => await getPaymentStats(),
  });
};
// =========INFO: Mutation ===========
// CREATE INTENT
interface intentArgs {
  price: number;
}
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

// CREATE PAYMENT
export const useCreatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: async (paymentData) => await createPayment(paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_ME'],
      });
      toast.success('Now you are premium user!!');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
