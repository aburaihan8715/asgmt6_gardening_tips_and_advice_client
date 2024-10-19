import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { useAuth } from '@/context/user.provider';
import { IComment } from '@/types/comment.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface IProps {
  comments: IComment[];
  handleDelete: (commentId: string) => void;
  isDeleteCommentPending: boolean;
  commentDeleteError: any;
}

const CommentItem = ({
  comments,
  isDeleteCommentPending,
  handleDelete,
  commentDeleteError,
}: IProps) => {
  const { user } = useAuth();

  console.log(comments);

  if (commentDeleteError) {
    return (
      <div className="mt-[90px]">
        <ErrorMessage>
          {commentDeleteError.message || 'Something went very wrong!!'}
        </ErrorMessage>
      </div>
    );
  }

  return (
    <>
      {isDeleteCommentPending && <LoadingWithOverlay />}
      <div className="space-y-4">
        {comments && comments?.length > 0 ? (
          comments?.map((item) => {
            const commentUser = item?.user;
            return (
              <div key={item?._id}>
                <div className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4">
                  {/* User Image */}
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={
                      commentUser.profilePicture ||
                      'https://randomuser.me/api/portraits/women/6.jpg'
                    }
                    alt={`user image`}
                    width={48}
                    height={48}
                  />

                  {/* Comment Content */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {commentUser?.username || 'Anonymous'}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(
                          item?.createdAt as string,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{item?.content}</p>
                  </div>

                  {/* Edit and Delete Icons */}
                  {commentUser?._id === user?._id && (
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/edit-comment?commentId=${item?._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center rounded-lg border border-gray-200 p-4">
              <p>No comment added yet!!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
