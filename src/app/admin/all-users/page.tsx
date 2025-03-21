'use client';
import Swal from 'sweetalert2';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useState } from 'react';
import { useDeleteUserMutation, useGetAllUsers } from '@/hooks/user.hook';

import DataTable from '@/components/common/DataTable';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const { mutate: userDeleteMutate, isPending: isUserDeletePending } =
    useDeleteUserMutation();

  const { data: userData, isLoading: isUsersLoading } = useGetAllUsers({
    page: currentPage,
    limit: itemsPerPage,
  });

  const users = userData?.data || [];
  const meta = userData?.meta || {};

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
        userDeleteMutate(id);
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
      accessorKey: 'profilePicture',
      header: 'Image',
      cell: ({ row }) => {
        const image = row.getValue('profilePicture') as string;
        return (
          <Image
            width={48}
            height={48}
            src={
              image ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            alt="user"
            className="h-10 w-10 rounded object-cover md:h-12 md:w-12"
          />
        );
      },
    },

    // TITLE
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="">{row.getValue('email')}</div>,
    },

    // TYPE
    {
      accessorKey: 'isVerified',
      header: () => <span className="whitespace-nowrap">User Type</span>,
      cell: ({ row }) => {
        const isVerified = row.getValue('isVerified');
        return (
          <div
            className={`uppercase ${isVerified ? 'text-orange-400' : ''}`}
          >
            {isVerified ? 'premium' : 'basic'}
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

  if (isUsersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isUserDeletePending && <LoadingWithOverlay />}
      <DataTable
        type="users"
        data={users}
        columns={columns}
        meta={meta}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default AllUsers;
