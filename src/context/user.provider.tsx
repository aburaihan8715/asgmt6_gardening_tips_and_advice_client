import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getCurrentUser } from '@/actions/auth.action';
import { useGetMe } from '@/hooks/user.hook';
import { IUser } from '@/types/user.type';

const UserContext = createContext<IUserProviderValues | undefined>(
  undefined,
);

interface IUserProviderValues {
  user: IUser | null;
  currentUser: IUser | null;
  isCurrentUserLoading: boolean;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure user ID is valid before calling the hook
  const { data, isLoading: isCurrentUserLoading } = useGetMe(
    user?._id ?? '',
  );
  const currentUser = data?.data || null;

  useEffect(() => {
    const handleUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleUser();
  }, []); // Avoid adding dependencies unless necessary

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        currentUser,
        isCurrentUserLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within the UserProvider context',
    );
  }

  return context;
};

export default UserProvider;
