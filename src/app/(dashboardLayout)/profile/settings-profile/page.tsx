'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/ui/SectionHeading';

// Define the Zod schema for validation
const userSettingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
});

export default function SettingsProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: 'John Doe', // Static value for name
      email: 'john.doe@example.com', // Static value for email
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    if (selectedFile) {
      // Process the file upload here if necessary
      console.log('Selected file:', selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <SectionHeading heading="User Settings" />
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name" className="text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="form-group mb-6">
          <label htmlFor="email" className="text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <Image
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="User photo"
            width={96}
            height={96}
            className="mb-4 h-24 w-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700 hover:file:bg-green-100"
          />
          <label htmlFor="photo" className="mt-2 block text-gray-700">
            Choose new photo
          </label>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Save settings
          </button>
        </div>
      </form>

      <hr className="my-8" />
    </>
  );
}
