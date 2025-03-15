'use server';
import axiosInstance from '@/lib/AxiosInstance';
import { IPayment } from '@/types/payment.type';

interface IPrice {
  price: number;
}

export const getAllPayments = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    let queryString = '/api/v1/payments';

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());

    if (params.toString()) queryString += `?${params.toString()}`;

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getNewFivePayments = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/payments/new-5-payments`,
    );
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

export const createPaymentIntent = async (intentPrice: IPrice) => {
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
