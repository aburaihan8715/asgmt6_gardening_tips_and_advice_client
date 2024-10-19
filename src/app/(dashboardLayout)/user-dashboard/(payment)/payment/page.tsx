'use client';
import SectionHeading from '@/components/ui/SectionHeading';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../_components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK as string,
);

const Payment = () => {
  return (
    <section className="px-1 md:px-10">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex justify-center">
          <SectionHeading heading="Payment" />
        </div>
        <div className="w-full rounded-md shadow-lg md:w-96 md:px-5 md:py-20">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
