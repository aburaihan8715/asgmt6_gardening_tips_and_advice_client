'use client';
import Swal from 'sweetalert2';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import Image from 'next/image';
import { useDeletePostMutation, useGetAllPosts } from '@/hooks/post.hook';
import LoadingSpinner from '@/components/common/LoadingSpinner';

import { useState } from 'react';

import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import DataTable from '@/components/common/DataTable';

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const { mutate: postDeleteMutate, isPending: isDeletePostPending } =
    useDeletePostMutation();

  const { data: postData, isLoading } = useGetAllPosts({
    page: currentPage,
    limit: itemsPerPage,
  });

  const posts = postData?.data || [];
  const meta = postData?.meta || {};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        // call delete api
        postDeleteMutate(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  const columns: ColumnDef<any>[] = [
    // CHECK
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    // IMAGE
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {
        const image = row.getValue('image') as string;
        return (
          <Image
            width={48}
            height={48}
            src={image || 'https://via.placeholder.com/400x400'}
            alt="Payment"
            className="h-10 w-10 rounded object-cover md:h-12 md:w-12"
          />
        );
      },
    },

    // TITLE
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="text-nowrap capitalize">
          {row.getValue('title')}
        </div>
      ),
    },

    // USER
    {
      accessorKey: 'user',
      header: 'Email',
      cell: ({ row }) => {
        const email = row.original.user.email;
        return <div>{email}</div>;
      },
    },

    // TYPE
    {
      accessorKey: 'isPremium',
      header: 'Type',
      cell: ({ row }) => {
        const isPremium = row.getValue('isPremium');
        return (
          <div
            className={`uppercase ${isPremium ? 'text-orange-400' : ''}`}
          >
            {isPremium ? 'premium' : 'free'}
          </div>
        );
      },
    },

    // ACTIONS
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <div className="">
            <Button
              onClick={() => handleDelete(id)}
              variant={'destructive'}
            >
              delete
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isDeletePostPending && <LoadingWithOverlay />}
      <DataTable
        type="posts"
        data={posts}
        columns={columns}
        meta={meta}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default AllPosts;
