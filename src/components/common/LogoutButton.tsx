'use client';
import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from '../ui/button';
import { logout } from '@/actions/auth.action';
import { useAuth } from '@/context/user.provider';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    if (isMounted) {
      router.replace('/');
      router.refresh(); // Ensure navigation updates
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button onClick={handleLogout} className="flex items-center space-x-2">
      <FaSignOutAlt />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
