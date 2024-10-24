const envConfig = {
  baseApi:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_API_CLOUD
      : process.env.NEXT_PUBLIC_BASE_API_LOCAL,

  subscription_price: process.env.NEXT_PUBLIC_SUBSCRIPTION_PRICE,
};

export default envConfig;
