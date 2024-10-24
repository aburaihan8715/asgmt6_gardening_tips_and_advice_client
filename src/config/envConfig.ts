const envConfig = {
  baseApi:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_API_CLOUD // Cloud URL in production
      : process.env.NEXT_PUBLIC_BASE_API_LOCAL, // Local URL in development
  subscription_price: process.env.NEXT_PUBLIC_SUBSCRIPTION_PRICE,
};

export default envConfig;
