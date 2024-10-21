'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void; // Optional onClick handler
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  className = '',
  onClick, // Destructure the onClick prop
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        onClick={onClick} // Add the onClick event to the span
        className={`border-b-2 ${
          isActive ? 'border-b-primary' : 'border-b-transparent'
        } hover:border-b-2 hover:border-b-primary ${className}`}
      >
        {children}
      </span>
    </Link>
  );
};

export default ActiveLink;
