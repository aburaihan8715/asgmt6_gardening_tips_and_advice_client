import { ReactNode } from 'react';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <p className="my-4 text-center font-medium text-red-500">{children}</p>
  );
};

export default ErrorMessage;
