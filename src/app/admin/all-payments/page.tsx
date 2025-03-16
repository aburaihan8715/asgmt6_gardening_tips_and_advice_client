'use client';

import Swal from 'sweetalert2';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { useDeletePostMutation } from '@/hooks/post.hook';
import LoadingSpinner from '@/components/common/LoadingSpinner';

import { useState } from 'react';

import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import DataTable from '@/components/common/DataTable';
import { useGetAllPayments } from '@/hooks/payment.hook';
import { parseISO, format } from 'date-fns';

const AllPayments = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const { mutate: postDeleteMutate, isPending: isDeletePostPending } =
    useDeletePostMutation();

  const { data: paymentData, isLoading } = useGetAllPayments({
    page: currentPage,
    limit: itemsPerPage,
  });

  const payments = paymentData?.data || [];
  const meta = paymentData?.meta || {};

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

    {
      accessorKey: 'email',
      header: 'User',
      cell: ({ row }) => (
        <div className="text-nowrap capitalize">
          {row.getValue('email')}
        </div>
      ),
    },

    {
      accessorKey: 'transactionId',
      header: 'Transaction Id',
      cell: ({ row }) => {
        return <div>{row.getValue('transactionId')}</div>;
      },
    },

    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        const isoDate = row.getValue('createdAt');
        const formattedDate = format(parseISO(`${isoDate}`), 'dd-MM-yyyy');

        return <div>{formattedDate}</div>;
      },
    },

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
        type="payments"
        data={payments}
        columns={columns}
        meta={meta}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default AllPayments;
