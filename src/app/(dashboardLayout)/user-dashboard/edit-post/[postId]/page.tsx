'use client';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPlusSquare } from 'react-icons/fa';
import { PostSchemas } from '@/schemas/post.schema';
import { useGetPost, useUpdatePostMutation } from '@/hooks/post.hook';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { useUser } from '@/context/user.provider';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useParams } from 'next/navigation';

type TPostFormValues = {
  title: string;
  description: string;
  category: string;
  content: string;
  image?: File;
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
  'code-block',
];

const EditMyPost = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate: updatePostMutation, isPending } =
    useUpdatePostMutation();
  const { user } = useUser();
  const { postId } = useParams();
  const { data: postData, isLoading } = useGetPost(postId as string);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TPostFormValues>({
    resolver: zodResolver(PostSchemas.postUpdateValidationSchema),
  });

  // Update form values when postData is loaded
  useEffect(() => {
    if (postData?.data) {
      const { title, description, category, content } = postData.data;
      setValue('title', title);
      setValue('description', description);
      setValue('category', category);
      setValue('content', content);
    }
  }, [postData, setValue]);

  const onSubmit = (data: TPostFormValues) => {
    const updatedPostData = {
      title: data.title,
      description: data.description,
      category: data.category,
      content: data.content,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(updatedPostData));
    if (data.image) {
      formData.append('file', data.image);
    }
    // console.log('Form Data🔥', Object.fromEntries(formData));
    const updatedData = {
      postId,
      formData,
    };

    updatePostMutation(updatedData);
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

  if (!user || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isPending && <LoadingWithOverlay />}
      <div className="container mx-auto p-5">
        <h1 className="mb-5 text-2xl font-bold text-green-700">
          Edit Post
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
              Description
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
          <div>
            {imagePreview ? (
              <div className="relative h-[400px] w-full">
                <Image
                  priority={true}
                  src={imagePreview}
                  alt="User photo preview"
                  fill
                  className="rounded object-cover"
                />
              </div>
            ) : (
              <div className="relative h-[400px] w-full">
                <Image
                  priority={true}
                  src={'https://dummyimage.com/600x400'}
                  alt="User photo"
                  fill
                  className="rounded object-cover"
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
              className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded border border-green-300 py-2 text-center text-xl text-green-700"
            >
              <div className="flex items-center gap-3">
                <FaPlusSquare />
                <span>Image</span>
              </div>
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

export default EditMyPost;
