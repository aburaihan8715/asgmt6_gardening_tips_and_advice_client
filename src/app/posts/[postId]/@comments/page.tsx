'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';

import { useParams } from 'next/navigation';
import CreateForm from './_components/CreateForm';
import { useState } from 'react';
import UpdateForm from './_components/UpdateForm';
import CommentItem from './_components/CommentItem';
import {
  useDeleteComment,
  useGetAllCommentsOnPost,
} from '@/hooks/comment.hooks';
import Swal from 'sweetalert2';

const CommentList = () => {
  const [isUpdateFrom, setIsUpdateFrom] = useState(false);
  const [commentId, setCommentId] = useState('');
  const params = useParams();
  const postId = params.postId as string;

  const { data: commentsData, isLoading: isCommentLoading } =
    useGetAllCommentsOnPost(postId);
  const comments = commentsData?.data || [];
  const hasComment = comments.length > 0;

  const {
    mutate: deleteCommentMutate,
    isPending: isDeleteCommentPending,
    error: commentDeleteError,
  } = useDeleteComment(postId);

  const handleDelete = async (commentId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    });

    if (result.isConfirmed) {
      deleteCommentMutate(commentId);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your comment has been deleted.',
        icon: 'success',
      });
    }
  };

  const handleUpdate = (cId: string) => {
    setCommentId(cId);
    setIsUpdateFrom(true);
  };

  if (isCommentLoading) {
    return (
      <div className="mt-[90px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <section className="mx-auto w-full max-w-4xl">
        <div className="mt-[80px] max-w-2xl md:mt-[10px]">
          <div className="mb-6">
            {isUpdateFrom ? (
              <UpdateForm
                postId={postId}
                commentId={commentId}
                setIsUpdateFrom={setIsUpdateFrom}
              />
            ) : (
              <CreateForm postId={postId} />
            )}
          </div>

          {hasComment && (
            <CommentItem
              comments={comments}
              postId={postId}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              isDeleteCommentPending={isDeleteCommentPending}
              commentDeleteError={commentDeleteError}
            />
          )}

          {!hasComment && (
            <div className="space-y-4">
              <div className="flex justify-center rounded-lg border border-gray-200 p-4">
                <p>No comment added yet!!</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CommentList;
