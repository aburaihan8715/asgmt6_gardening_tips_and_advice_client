'use client'; // Only for App Router

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

export default function UnauthPage() {
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

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Access Denied
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          You don’t have permission to view this page.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </motion.div>
    </div>
  );
}
