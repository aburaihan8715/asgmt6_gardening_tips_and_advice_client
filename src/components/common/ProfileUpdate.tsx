'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/common/SectionHeading';
import { useAuth } from '@/context/user.provider';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { AuthSchemas } from '@/schemas/auth.schema';

import { Button } from '../ui/button';
import { useUpdateMe } from '@/hooks/user.hook';
import { Camera } from 'lucide-react';

// Interface for the form data
interface IUserSettingsFormData {
  username: string;
  email: string;
}

export default function ProfileUpdate() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { currentUser, isCurrentUserLoading } = useAuth();
  const userId = currentUser?._id as string;

  const { mutate: profileMutate, isPending } = useUpdateMe(userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSettingsFormData>({
    resolver: zodResolver(AuthSchemas.userSettingsSchema),
    defaultValues: {
      username: currentUser?.username || '',
      email: currentUser?.email || '',
    },
  });

  const onSubmit = (data: IUserSettingsFormData) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) {
      formData.append('file', file);
    }
    profileMutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // Cleanup the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      {(isPending || isCurrentUserLoading) && <LoadingWithOverlay />}

      <div className="rounded-md bg-white px-1 md:p-8">
        <div className="mb-5 flex justify-center">
          <SectionHeading heading="update profile" />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username?.message}
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
              disabled
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

          <div className="relative">
            {/* Show the preview if a file is selected */}
            {preview ? (
              <Image
                src={preview}
                alt="User photo preview"
                width={96}
                height={96}
                className="mb-4 h-[150px] w-[150px] rounded-full border-2 border-dashed border-gray-900 object-cover p-2"
              />
            ) : (
              <Image
                src={
                  currentUser?.profilePicture ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                alt="User photo"
                width={96}
                height={96}
                className="mb-4 h-[150px] w-[150px] rounded-full border-2 border-dashed border-gray-900 object-cover p-2"
              />
            )}

            <input
              type="file"
              accept="image/*"
              id="photo"
              onChange={handleFileChange}
              className="hidden w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700 hover:file:bg-green-100"
            />
            <label
              htmlFor="photo"
              className="absolute bottom-5 left-24 flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-black/50 px-3 py-1 text-xl text-white transition hover:bg-black/70"
            >
              <Camera />
            </label>
          </div>

          <div className="text-right">
            <Button type="submit">Save settings</Button>
          </div>
        </form>
      </div>
    </>
  );
}
