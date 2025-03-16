'use client';

import 'react-quill-new/dist/quill.snow.css';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchemas } from '@/schemas/post.schema';
import { useCreatePostMutation } from '@/hooks/post.hook';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { useAuth } from '@/context/user.provider';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Camera } from 'lucide-react';

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

type TPostFormValues = {
  title: string;
  description: string;
  category: string;
  content: string;
  image?: File;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'indent',
  'link',
  'image',
];

const CreatePost = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TPostFormValues>({
    resolver: zodResolver(PostSchemas.postValidationSchema),
  });

  const { mutate: createPostMutate, isPending } = useCreatePostMutation();
  const { currentUser, isCurrentUserLoading } = useAuth();

  const onSubmit = (data: TPostFormValues) => {
    const postData = {
      user: currentUser?._id,
      title: data.title,
      description: data.description,
      category: data.category,
      content: data.content,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(postData));
    if (data.image) {
      formData.append('file', data.image);
    }
    createPostMutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setIsMounted(true); // Set the flag once the component has mounted
  }, []);

  if (isCurrentUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="container mx-auto md:p-5">
        <h1 className="mb-5 text-xl font-bold text-green-700 md:text-2xl">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-green-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className={`block w-full border ${
                errors.title ? 'border-red-500' : 'border-green-300'
              } rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300`}
            />
            {errors.title && (
              <p className="text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-green-700"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              {...register('category')}
              className={`block w-full border ${
                errors.category ? 'border-red-500' : 'border-green-300'
              } rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300`}
            >
              <option value="">Select a category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Flowers">Flowers</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-green-700"
              htmlFor="description"
            >
              Overview
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className={`block w-full border ${
                errors.description ? 'border-red-500' : 'border-green-300'
              } rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300`}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Input with Preview */}
          <div className="relative">
            {imagePreview ? (
              <div className="relative h-[150px] w-full md:h-[400px]">
                <Image
                  priority={true}
                  src={imagePreview}
                  alt="User photo preview"
                  fill
                  className="rounded-md border-2 border-dashed border-gray-600 object-cover p-5"
                />
              </div>
            ) : (
              <div className="relative h-[150px] w-full md:h-[400px]">
                <Image
                  priority={true}
                  src={'https://dummyimage.com/600x400'}
                  alt="User photo"
                  fill
                  className="rounded-md border-2 border-dashed border-gray-600 object-cover p-5"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              id="photo"
              onChange={handleImageChange}
              className="hidden w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700 hover:file:bg-green-100"
            />

            <label
              htmlFor="photo"
              className="absolute bottom-1/4 right-1/2 translate-x-1/2 cursor-pointer rounded-lg bg-black/50 px-3 py-1 text-white transition hover:bg-black/70"
            >
              <Camera size={18} className="mr-1 inline-block" /> Update
              Cover
            </label>
          </div>

          {/* Quill Editor with Label */}
          <div className="relative">
            <label
              className="mb-1 block text-sm font-medium text-green-700"
              htmlFor="content"
            >
              Content
            </label>
            {/* Render ReactQuill only on client */}
            {isMounted && (
              <ReactQuill
                placeholder="Write your advice..."
                theme="snow"
                value={watch('content') || ''}
                onChange={(content) =>
                  setValue('content', content, { shouldValidate: true })
                }
                modules={modules}
                formats={formats}
                className="rounded-md border border-green-300"
              />
            )}
            {errors.content && (
              <p className="text-xs text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-green-700 py-2 text-white transition duration-200 hover:bg-green-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
