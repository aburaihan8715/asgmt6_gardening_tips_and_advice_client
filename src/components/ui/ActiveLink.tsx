'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={`border-b-2 ${isActive ? 'border-b-primary' : 'border-b-transparent'} hover:border-b-2 hover:border-b-primary ${className}`}
      >
        {children}
      </span>
    </Link>
  );
};

export default ActiveLink;
