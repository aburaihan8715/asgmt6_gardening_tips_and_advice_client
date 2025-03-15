'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <FaSearch className="mb-4 text-6xl text-gray-400" />
      <h2 className="mb-2 text-2xl font-semibold text-gray-700">
        No Data Found
      </h2>
      <p className="mb-6 text-gray-500">
        We couldn&apos;t find any data matching your criteria. Try
        adjusting your search or filter.
      </p>
      <button
        onClick={handleGoBack}
        className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
