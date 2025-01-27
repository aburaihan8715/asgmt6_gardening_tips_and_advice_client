import { ReactNode } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

interface ErrorMessageProps {
  children?: ReactNode;
  className?: string; // For custom styling
  icon?: ReactNode; // For custom icon, default to error icon
}

const ErrorMessage = ({
  children,
  className = '',
  icon,
}: ErrorMessageProps) => {
  return (
    <div
      className={`my-4 flex items-center justify-center space-x-2 text-red-500 ${className}`}
    >
      {icon || <FaExclamationCircle className="text-4xl" />}
      <p className="font-medium">{children || 'Something went wrong.'}</p>
    </div>
  );
};

export default ErrorMessage;
