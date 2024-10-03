import LoadingSpinner from '@/components/ui/LoadingSpinner';
import React from 'react';

const ContactLoading = () => {
  return (
    <div className="mt-[80px]">
      <LoadingSpinner />
    </div>
  );
};

export default ContactLoading;

// const LoadingSpinner = () => {
//   return (
//     <div className="container mx-auto text-gray-600">
//       <div className="mt-8 text-center text-5xl">
//         <span>l</span>
//         <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-dotted border-green-600 bg-transparent"></span>
//         <span>ading</span>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;
