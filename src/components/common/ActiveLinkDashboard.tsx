'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
  href?: string;
  btn?: boolean;
}

const ActiveLinkDashboard = ({
  className = '',
  children,
  href,
  btn,
}: IProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {href && (
        <Link
          href={href}
          className={`${className} ${isActive || isHovered ? 'bg-gray-400/30' : ''} rounded-md px-2 py-1`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      )}

      {btn && (
        <button
          className={`${className} ${isActive || isHovered ? 'bg-gray-400/30' : ''} rounded-md px-2 py-1`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default ActiveLinkDashboard;
