'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <motion.div
        className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="Access Denied"
            width={128}
            height={128}
            className="mx-auto mb-6"
          />
        </motion.div>

        <h2 className="mb-2 text-2xl font-semibold text-gray-700">
          No Data Found
        </h2>
        <p className="mb-6 text-gray-500">
          We couldn&apos;t find any data matching your criteria. Try
          adjusting your search or filter.
        </p>

        <button
          onClick={handleGoBack}
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
