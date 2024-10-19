'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { AuthSchemas } from '@/schemas/auth.schema';
import { useResetPasswordMutation } from '@/hooks/auth.hook';

type TResetPasswordFormValues = {
  newPassword: string;
};

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TResetPasswordFormValues>({
    resolver: zodResolver(AuthSchemas.resetPasswordValidationSchema),
  });

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const passwordResetToken = searchParams.get('passwordResetToken');

  const { mutate: passwordResetMutate, isPending } =
    useResetPasswordMutation();

  const onSubmit = (data: TResetPasswordFormValues) => {
    const passwordData = {
      id,
      passwordResetToken,
      newPassword: data.newPassword,
    };
    passwordResetMutate(passwordData);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Reset Your Password
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            {/* New Password Input */}
            <div className="relative flex flex-col">
              <label
                htmlFor="new-password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                {...register('newPassword')}
                className={`mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>

            {/* Reset Password Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
