'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import Link from 'next/link';
import loginValidationSchema from '@/schemas/login.schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/user.provider';
import { useUserLogin } from '@/hooks/auth.hook';
import { useEffect } from 'react';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get('redirect');

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/');
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="mt-[80px] flex min-h-screen justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <SectionHeading heading="Login" />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-700"
                >
                  Email
                </label>
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
                <input
                  id="password"
                  type="password"
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
                href="/register"
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
