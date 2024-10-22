'use client';

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

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { IPost } from '@/types/postData.type';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useGetFavouritePosts } from '@/hooks/user.hook';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Link from 'next/link';

const MyPosts = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data: postData, isError, isLoading } = useGetFavouritePosts();
  const posts: IPost[] = postData?.data || [];

  const columns: ColumnDef<IPost>[] = [
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
      accessorKey: 'image', // Add image accessor
      header: 'Image',
      cell: ({ row }) => {
        const image = row.getValue('image') as string;
        return (
          <Image
            width={48}
            height={48}
            src={image || 'https://via.placeholder.com/400x400'}
            alt="Payment"
            className="h-12 w-12 rounded object-cover"
          />
        );
      },
    },

    // TITLE
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('title')}</div>
      ),
    },

    // TYPE
    {
      accessorKey: 'isPremium',
      header: 'Type',
      cell: ({ row }) => {
        const isPremium = row.getValue('isPremium');
        return (
          <div className={`uppercase ${isPremium && 'text-orange-400'}`}>
            {isPremium ? 'premium' : 'free'}
          </div>
        );
      },
    },
    {
      accessorKey: 'upvotesCount',
      header: 'Upvotes',
      cell: ({ row }) => {
        const upvotes = row.getValue('upvotesCount') as
          | number
          | null
          | undefined;
        return (
          <button className="flex items-center space-x-1 text-green-500">
            <FaArrowUp />
            <span>
              {upvotes !== undefined && upvotes !== null
                ? upvotes.toString()
                : '0'}
            </span>
          </button>
        );
      },
    },
    {
      accessorKey: 'downvotesCount',
      header: 'Downvotes',
      cell: ({ row }) => {
        const downvotes = row.getValue('downvotesCount') as
          | number
          | null
          | undefined;
        return (
          <button className="flex items-center space-x-1 text-red-500">
            <FaArrowDown />
            <span>
              {downvotes !== undefined && downvotes !== null
                ? downvotes.toString()
                : '0'}
            </span>
          </button>
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
          <div className="flex gap-3">
            <Link href={`/posts/${id}`}>
              <Button variant={'secondary'}>See details</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: posts,
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
    return (
      <ErrorMessage>
        <div className="rounded border p-5">You have no post yet!!</div>
      </ErrorMessage>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter title..."
            value={
              (table.getColumn('title')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
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
              {posts.length ? (
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
                    No posts yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* pagination */}
      </div>
    </>
  );
};

export default MyPosts;
