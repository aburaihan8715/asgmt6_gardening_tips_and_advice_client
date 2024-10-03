'use client';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import UserProvider from '@/context/user.provider';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;