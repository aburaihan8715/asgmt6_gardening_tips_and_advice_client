'use client';
import { Button } from '@/components/ui/button';
import { useStripe, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  //   const elements = useElements();
  //   // const [clientSecret, setClientSecret] = useState<string | null>(null);
  //   const [transactionId, setTransactionId] = useState('');
  //   const [cardError, setCardError] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isCardComplete, setIsCardComplete] = useState(false);
  // const price=10

  // useEffect(() => {
  //   if (price && price > 0) {
  //     const getClientSecret = async () => {
  //       try {
  //         const res = await createPaymentIntent({ price }).unwrap();
  //         setClientSecret(res?.data?.clientSecret || null);
  //       } catch (error) {
  //         console.error('Error getting client secret:', error);
  //       }
  //     };
  //     getClientSecret();
  //   }
  // }, [createPaymentIntent, price]);

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   if (!stripe || !elements || !price) {
  //     console.error(
  //       'May be not getting stripe, elements and clientSecret!'
  //     );
  //     setIsLoading(false);
  //     return;
  //   }

  //   const card = elements.getElement(CardElement);
  //   if (!card) {
  //     console.error('Card Element is not found.');
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card,
  //       // billing_details: {
  //       //   email: user?.email || 'unknown',
  //       //   name: user?.name || 'anonymous',
  //       // },
  //     });

  //     if (error) {
  //       console.error('[Payment Method Error]', error);
  //       setCardError(error?.message as string);
  //       setTransactionId('');
  //       setIsLoading(false);
  //       return;
  //     } else {
  //       setCardError('');
  //     }

  //     const { paymentIntent, error: intentError } =
  //       await stripe.confirmCardPayment(clientSecret, {
  //         payment_method: paymentMethod.id,
  //       });

  //     if (intentError) {
  //       console.error('[Payment Intent Error]', intentError);
  //       setIsLoading(false);
  //       return;
  //     }

  //     if (paymentIntent?.status === 'succeeded') {
  //       setTransactionId(paymentIntent.id);
  //       console.log('Payment succeeded:', paymentIntent);

  //     }
  //   } catch (error) {
  //     console.error('Payment Error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleCardChange = (event: any) => {
  //   setIsCardComplete(event.complete);
  //   if (event.error) {
  //     setCardError(event.error.message);
  //   } else {
  //     setCardError('');
  //   }
  // };

  return (
    <>
      <form>
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
          />
        </div>
        <div className="mt-5">
          <Button
            className="w-full text-lg"
            type="submit"
            disabled={!stripe}
          >
            confirm
            {/* {isLoading ? 'Processing...' : 'Confirm'} */}
          </Button>
        </div>
      </form>

      {/* {cardError && <p className="text-warning">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600">
          Transaction complete with transaction ID: {transactionId}
        </p>
      )} */}
    </>
  );
};

export default CheckoutForm;
