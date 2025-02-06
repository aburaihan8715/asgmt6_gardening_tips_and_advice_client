import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import { Button } from '../ui/button';
import { logout } from '@/actions/auth.action';
import { useAuth } from '@/context/user.provider';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <Button onClick={handleLogout} className="flex items-center space-x-2">
      <FaSignOutAlt />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
