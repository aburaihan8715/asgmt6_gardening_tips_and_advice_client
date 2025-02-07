import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { useAuth } from '@/context/user.provider';
import { IComment } from '@/types/comment.type';
import Image from 'next/image';

import { FaEdit, FaTrash } from 'react-icons/fa';

interface IProps {
  comments: IComment[];
  postId: string;
  handleDelete: (commentId: string) => void;
  handleUpdate: (commentId: string) => void;
  isDeleteCommentPending: boolean;
  commentDeleteError: any;
}

const CommentItem = ({
  comments,
  isDeleteCommentPending,
  handleDelete,
  handleUpdate,
  commentDeleteError,
}: IProps) => {
  const { currentUser, isCurrentUserLoading } = useAuth();

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
      {(isDeleteCommentPending || isCurrentUserLoading) && (
        <LoadingWithOverlay />
      )}
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
                    <p className="mt-2 text-gray-700">{item?.comment}</p>
                  </div>

                  {/* Edit and Delete Icons */}
                  {commentUser?._id === currentUser?._id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdate(item?._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
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
