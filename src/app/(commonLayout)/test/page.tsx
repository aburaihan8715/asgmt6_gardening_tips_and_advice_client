// 'use client';
// import { useGetInfinitePosts } from '@/hooks/post.hook';
// import { IPost } from '@/types';
// import React from 'react';

// interface IProps {
//   searchTerm?: string;
//   category?: string;
//   voteFilter?: string;
// }

// const PostsList = ({ searchTerm, category, voteFilter }: IProps) => {
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//     isFetching,
//   } = useGetInfinitePosts({
//     searchTerm,
//     category,
//     voteFilter,
//   });

//   return status === 'pending' ? (
//     <p>Loading...</p>
//   ) : status === 'error' ? (
//     <p>Error: {error.message}</p>
//   ) : (
//     <div className="mx-auto max-w-sm">
//       {data?.pages?.map((group, i) => (
//         <React.Fragment key={i}>
//           {group?.data?.map((item: IPost) => (
//             <p
//               className="mt-4 rounded border p-10 text-center"
//               key={item?._id}
//             >
//               {item?.title}
//             </p>
//           ))}
//         </React.Fragment>
//       ))}
//       <div>
//         <button
//           className="mt-2 rounded border p-2"
//           onClick={() => fetchNextPage()}
//           disabled={!hasNextPage || isFetchingNextPage}
//         >
//           {isFetchingNextPage
//             ? 'Loading more...'
//             : hasNextPage
//               ? 'Load More'
//               : 'Nothing more to load'}
//         </button>
//       </div>
//       <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
//     </div>
//   );
// };

// export default PostsList;

'use client';
import { useGetInfinitePosts } from '@/hooks/post.hook';
import { IPost } from '@/types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface IProps {
  searchTerm?: string;
  category?: string;
  voteFilter?: string;
}

const PostsList = ({ searchTerm, category, voteFilter }: IProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useGetInfinitePosts({
    searchTerm,
    category,
    voteFilter,
  });

  // Set up intersection observer
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1.0, // Trigger when the bottom of the div is fully visible
    triggerOnce: false, // Continue to trigger as long as the element is in view
  });

  // Fetch next page when loadMoreRef is in view
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="mx-auto max-w-sm">
      {data?.pages?.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data?.map((item: IPost) => (
            <p
              className="mt-4 rounded border p-10 text-center"
              key={item?._id}
            >
              {item?.title}
            </p>
          ))}
        </React.Fragment>
      ))}

      {/* Load More sentinel element */}
      <div ref={loadMoreRef} className="mt-4 p-2 text-center">
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load more posts...'
            : 'No more posts to load'}
      </div>

      {/* Show fetching status */}
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
};

export default PostsList;
