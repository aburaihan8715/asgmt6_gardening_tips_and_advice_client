'use client';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import envConfig from '@/config/envConfig';
import { useAuth } from '@/context/user.provider';
import {
  useCreatePaymentIntentMutation,
  useCreatePaymentMutation,
} from '@/hooks/payment.hook';
import { useGetMe } from '@/hooks/user.hook';
import {
  useStripe,
  CardElement,
  useElements,
} from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [transactionId, setTransactionId] = useState('');
  const [clientSecrets, setClientSecrets] = useState('');
  const [cardError, setCardError] = useState('');
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false); // New state for tracking payment completion
  const { user } = useAuth();
  const {
    data: currentUserData,
    refetch,
    isLoading: isCurrentUserLoading,
  } = useGetMe();
  const {
    mutate: paymentIntentMutate,
    data: intentData,
    isPending: paymentIntentPending,
  } = useCreatePaymentIntentMutation();

  const {
    mutate: createPaymentMutate,
    isPending: isCreatePaymentPending,
  } = useCreatePaymentMutation();

  const price = Number(envConfig.subscription_price);
  const currentUser = currentUserData?.data;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe or elements not available.');
      return;
    }

    // Create Payment Intent
    if (price) {
      paymentIntentMutate({ price });
    }

    const client_secret = intentData?.data?.clientSecret;

    if (!client_secret) {
      console.error('Client secret not available.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error('Card Element is not found.');
      return;
    }

    // Payment Process
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          email: currentUser?.email || 'unknown',
          name: currentUser?.username || 'anonymous',
        },
      });

      if (error) {
        setCardError(error.message as string);
        setTransactionId('');
        return;
      }

      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: paymentMethod.id,
        });

      if (intentError) {
        setCardError(intentError.message as string);
        console.log('Payment intent error:', intentError);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        setIsPaymentComplete(true); // Mark payment as complete
        card.clear();
        console.log('Payment succeeded:', paymentIntent);
        const paymentInfo = {
          email: currentUser?.email,
          transactionId: paymentIntent.id,
          price: price,
        };
        // create payment in database
        createPaymentMutate(paymentInfo, {
          onSuccess: () => {
            refetch();
          },
        });
      }
    } catch (error: any) {
      console.log(error);
      setCardError('Payment Error');
    }
  };

  const handleCardChange = (event: any) => {
    setIsCardComplete(event.complete);
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError('');
    }
  };

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    if (price) {
      paymentIntentMutate({ price });
    }
  }, [price, paymentIntentMutate]);

  useEffect(() => {
    if (intentData?.data?.clientSecret) {
      setClientSecrets(intentData.data.clientSecret);
    }
  }, [intentData]);

  if (isCurrentUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isCreatePaymentPending ||
        (paymentIntentPending && <LoadingWithOverlay />)}
      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden rounded-md border px-1 shadow">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  padding: '40px',
                  lineHeight: '40px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={handleCardChange}
          />
        </div>
        <div className="mt-5">
          <Button
            className="w-full text-lg"
            type="submit"
            disabled={
              !stripe ||
              !clientSecrets ||
              !isCardComplete ||
              isPaymentComplete
            } // Disable if payment complete
          >
            {isPaymentComplete ? 'Payment Completed' : 'Confirm'}{' '}
            {/* Button text update */}
          </Button>
        </div>
      </form>

      {cardError && <p className="text-warning">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600">
          Transaction complete with transaction ID: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
