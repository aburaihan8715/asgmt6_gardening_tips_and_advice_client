// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import { IUser } from '@/types';
// import { getCurrentUser } from '@/actions/auth.action';

// const UserContext = createContext<IUserProviderValues | undefined>(
//   undefined,
// );

// interface IUserProviderValues {
//   user: IUser | null;
//   isLoading: boolean;
//   setUser: (user: IUser | null) => void;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
// }

// const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleUser = async () => {
//     const user = await getCurrentUser();
//     setUser(user);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     handleUser();
//   }, [isLoading]);

//   return (
//     <UserContext.Provider
//       value={{ user, setUser, isLoading, setIsLoading }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(UserContext);

//   if (context === undefined) {
//     throw new Error(
//       'useAuth must be used within the UserProvider context',
//     );
//   }

//   return context;
// };

// export default UserProvider;

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { IUser } from '@/types';
import { useGetCurrentUser } from '@/hooks/auth.hook';

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
}

const UserContext = createContext<IUserProviderValues | undefined>(
  undefined,
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // Fetch user data
  const { data, isLoading: isUserLoading } = useGetCurrentUser();

  // Memoize current user to avoid unnecessary re-renders
  const currentUser = useMemo(() => data?.data || null, [data]);

  useEffect(() => {
    if (currentUser && currentUser !== user) {
      setUser(currentUser);
    }
  }, [currentUser, user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading: isUserLoading }}
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
