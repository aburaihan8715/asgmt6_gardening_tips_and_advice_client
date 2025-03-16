'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SectionHeading from '@/components/common/SectionHeading';
// import { useChangePasswordMutation } from '@/hooks/auth.hook';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';

import { AuthSchemas } from '@/schemas/auth.schema';
import { useChangePasswordMutation } from '@/hooks/auth.hook';
import { Button } from '../ui/button';

interface IPasswordChangeFormValues {
  currentPassword: string;
  newPassword: string;
}

const PasswordUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPasswordChangeFormValues>({
    resolver: zodResolver(AuthSchemas.passwordChangeValidationSchema),
  });

  const { mutate: changePasswordMutate, isPending } =
    useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data: IPasswordChangeFormValues) => {
    changePasswordMutate(data);
    reset();
  };

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="mx-auto mt-12 rounded-md bg-white px-1 md:p-8">
        <div className="mb-5 flex justify-center">
          <SectionHeading heading="update password" />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="form-group">
            <label
              htmlFor="currentPassword"
              className="block text-gray-700"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                placeholder="Current Password"
                id="currentPassword"
                type={showPassword.currentPassword ? 'text' : 'password'}
                {...register('currentPassword')}
                className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.currentPassword ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="form-group">
            <label htmlFor="newPassword" className="block text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                placeholder="New Password"
                type={showPassword.newPassword ? 'text' : 'password'}
                {...register('newPassword')}
                className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.newPassword ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <Button type="submit">Change Password</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordUpdate;
