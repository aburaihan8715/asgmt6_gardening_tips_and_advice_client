'use client';
import Swal from 'sweetalert2';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import { useState } from 'react';

import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { useDeleteUserMutation, useGetAllUsers } from '@/hooks/user.hook';
import { IUser } from '@/types';

const AllUsers = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const { mutate: userDeleteMutate, isPending: isUserDeletePending } =
    useDeleteUserMutation();

  const {
    data: userData,
    isError,
    isLoading,
  } = useGetAllUsers({
    page: currentPage,
    limit: itemsPerPage,
  });

  const users: IUser[] = userData?.data || [];
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

  const columns: ColumnDef<IUser>[] = [
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

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage>{`Failed to fetch user data!`}</ErrorMessage>;
  }

  return (
    <>
      {isUserDeletePending && <LoadingWithOverlay />}
      <div className="w-full">
        <div className="flex items-center gap-2 py-4">
          <Input
            placeholder="Filter email..."
            value={
              (table.getColumn('email')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* pagination */}
        <div className="flex justify-start">
          <Pagination
            currentPage={currentPage}
            totalPages={meta?.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
