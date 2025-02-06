'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeading from '@/components/common/SectionHeading';
import { FaPlusSquare } from 'react-icons/fa';
import { useAuth } from '@/context/user.provider';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { AuthSchemas } from '@/schemas/auth.schema';
import { useSettingsProfileMutation } from '@/hooks/auth.hook';
import { Button } from '../ui/button';

// Interface for the form data
interface IUserSettingsFormData {
  username: string;
  email: string;
}

export default function SettingsProfileForm() {
  const { user } = useAuth();
  const { mutate: profileMutate, isPending } =
    useSettingsProfileMutation();

  // console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSettingsFormData>({
    resolver: zodResolver(AuthSchemas.userSettingsSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = (data: IUserSettingsFormData) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) {
      formData.append('file', file);
    }

    // console.log(data);
    profileMutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Generate a preview URL for the selected file
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="flex justify-center">
        <SectionHeading heading="User Settings" />
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

        <div className="">
          {/* Show the preview if a file is selected */}
          {preview ? (
            <Image
              src={preview}
              alt="User photo preview"
              width={96}
              height={96}
              className="mb-4 h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <Image
              src={
                user && user?.profilePicture
                  ? user.profilePicture
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              alt="User photo"
              width={96}
              height={96}
              className="mb-4 h-24 w-24 rounded-full object-cover"
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
            className="ml-2 flex w-fit cursor-pointer items-center gap-2 text-xl text-gray-700"
          >
            <FaPlusSquare />
            <span>Image</span>
          </label>
        </div>

        <div className="text-right">
          <Button type="submit">Save settings</Button>
        </div>
      </form>

      <hr className="my-8" />
    </>
  );
}
