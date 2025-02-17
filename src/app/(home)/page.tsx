'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/common/SectionHeading';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/user.provider';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { AuthSchemas } from '@/schemas/auth.schema';
import { useLoginMutation } from '@/hooks/auth.hook';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useAuth();

  const redirect = searchParams.get('redirect');

  const { mutate: loginMutate, isPending, isSuccess } = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(AuthSchemas.loginValidationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: LoginFormValues) => {
    loginMutate(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess && !isUserLoading && user) {
      if (redirect) {
        router.push(redirect);
      } else {
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (user.role === 'user') {
          router.push('/posts');
        }
      }
    }
  }, [isPending, isSuccess, redirect, router, user, isUserLoading]);

  const handleCredentials = (role: string) => {
    if (role === 'admin') {
      setValue('email', 'admin@gmail.com');
      setValue('password', 'test1234');
    } else if (role === 'user') {
      setValue('email', 'user@gmail.com');
      setValue('password', 'test1234');
    }
  };

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="mt-[80px] flex min-h-screen justify-center bg-gray-50 sm:px-6 md:mt-0 md:py-12 lg:px-8">
        <motion.div
          className="w-full max-w-md rounded-lg bg-white p-1 shadow-lg md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-2 flex justify-center">
            <SectionHeading heading="Login" />
          </div>

          <div className="mb-2 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCredentials('admin')}
              className="rounded-md bg-green-600 px-2 py-1 text-gray-200 transition duration-300"
            >
              admin credentials
            </button>
            <button
              onClick={() => handleCredentials('user')}
              className="rounded-md bg-green-600 px-2 py-1 text-gray-200 transition duration-300"
            >
              user credentials
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-green-700"
                  >
                    Email
                  </label>
                  <Link
                    href="/auth/forget-password"
                    className="text-sm text-green-700 hover:text-green-800"
                  >
                    Forget Password?
                  </Link>
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-green-700'
                  } bg-gray-100 px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'focus:ring-red-500'
                      : 'focus:ring-green-700'
                  } sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.password
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-green-700'
                    } bg-gray-100 px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'focus:ring-red-500'
                        : 'focus:ring-green-700'
                    } sm:text-sm`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/register"
                className="font-medium text-green-700 hover:text-green-800"
              >
                Register
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
