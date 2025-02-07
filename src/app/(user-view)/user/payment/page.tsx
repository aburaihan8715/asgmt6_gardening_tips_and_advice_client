'use client';
import SectionHeading from '@/components/common/SectionHeading';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../_components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK as string,
);

const Payment = () => {
  return (
    <section className="px-1 md:px-10">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex justify-center">
          <SectionHeading heading="Payment" />
        </div>
        <div className="w-full rounded-md border p-10 md:w-[600px] md:px-5 md:py-20">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
