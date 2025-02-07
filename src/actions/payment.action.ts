'use server';
import axiosInstance from '@/lib/AxiosInstance';

export const getAllPayments = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/payments`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getPaymentStats = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/payments/payment-stats`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

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
