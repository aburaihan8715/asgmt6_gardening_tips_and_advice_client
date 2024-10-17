import { IComment } from '@/types/comment.type';
import Image from 'next/image';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CommentItem = ({ comments }: { comments: IComment[] }) => {
  console.log(comments);
  return (
    <div className="space-y-4">
      {comments && comments?.length > 0 ? (
        comments?.map((item) => {
          const user = item?.user;
          return (
            <div key={item?._id}>
              <div className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4">
                {/* User Image */}
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  src={
                    user.profilePicture ||
                    'https://randomuser.me/api/portraits/women/6.jpg'
                  }
                  alt={`user image`}
                  width={48}
                  height={48}
                />

                {/* Comment Content */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{'Anonymous'}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(
                        item?.createdAt as string,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{item?.content}</p>
                </div>

                {/* Edit and Delete Icons */}
                <div className="flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
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
  );
};

export default CommentItem;
