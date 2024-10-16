'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgetPasswordMutation } from '@/hooks/auth.hook';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { AuthSchemas } from '@/schemas/auth.schema';

type TForgotPasswordFormValues = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForgotPasswordFormValues>({
    resolver: zodResolver(AuthSchemas.forgetPasswordValidationSchema),
  });

  const { mutate: forgetPasswordMutate, isPending } =
    useForgetPasswordMutation();

  const onSubmit = (data: TForgotPasswordFormValues) => {
    forgetPasswordMutate(data);
    reset();
  };

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Forget Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 py-2 text-white transition duration-200 hover:bg-green-600"
              >
                Send Password Reset Link
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <a
              href="/login"
              className="text-sm text-gray-600 hover:text-green-500"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
