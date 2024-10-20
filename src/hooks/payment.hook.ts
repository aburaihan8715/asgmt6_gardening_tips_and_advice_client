import {
  createPayment,
  createPaymentIntent,
} from '@/actions/payment.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// CREATE INTENT
interface intentArgs {
  price: number;
}
export const useCreatePaymentIntentMutation = () => {
  return useMutation<any, Error, intentArgs>({
    mutationFn: async (intentData) =>
      await createPaymentIntent(intentData),
    onSuccess: () => {
      console.log('Payment intent created successfully!!');
    },
    onError: (error: any) => {
      console.log(error);
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
