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
import {
  useDeletePostMutation,
  useGetMyPosts,
  useMakePostPremiumMutation,
} from '@/hooks/post.hook';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { IPost } from '@/types/postData.type';
import Pagination from '@/components/ui/Pagination';
import { useState } from 'react';
import Link from 'next/link';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const MyPosts = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const { mutate: postDeleteMutate, isPending: isDeletePostPending } =
    useDeletePostMutation();
  const { mutate: makePremiumMutate, isPending: isMakePremiumPending } =
    useMakePostPremiumMutation();

  const {
    data: postData,
    isError,
    isLoading,
  } = useGetMyPosts({
    page: currentPage,
    limit: itemsPerPage,
  });

  const posts: IPost[] = postData?.data || [];
  const meta = postData?.meta || {};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeletePost = (id: string) => {
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

  const handleMakePremium = (id: string) => {
    makePremiumMutate(id);
  };

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
            <Link href={`edit-post/${id}`}>
              <Button variant={'secondary'}>edit</Button>
            </Link>
            <Button
              onClick={() => handleDeletePost(id)}
              variant={'destructive'}
            >
              delete
            </Button>
            <Button
              onClick={() => handleMakePremium(id)}
              variant={'default'}
            >
              make premium
            </Button>
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
      {(isDeletePostPending || isMakePremiumPending) && (
        <LoadingWithOverlay />
      )}
      <div className="w-full">
        <div className="flex flex-col items-center gap-3 py-4 md:flex-row">
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
            <DropdownMenuTrigger asChild className="border">
              <Button
                variant="outline"
                className="ml-auto w-full md:w-auto"
              >
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
            {/* <TableBody>
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
            </TableBody> */}
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

export default MyPosts;
