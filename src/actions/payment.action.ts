'use server';
import axiosInstance from '@/lib/AxiosInstance';

// CREATE PAYMENT INTENT
interface IIntent {
  price: number;
}
export const createPaymentIntent = async (intentPrice: IIntent) => {
  try {
    const { data } = await axiosInstance.post(
      '/api/v1/payments/create-payment-intent',
      intentPrice,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// CREATE
interface IPayment {
  email: string;
  transactionId: string;
  price: number;
}
export const createPayment = async (paymentData: IPayment) => {
  try {
    const { data } = await axiosInstance.post(
      '/api/v1/payments/create-payment',
      paymentData,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
