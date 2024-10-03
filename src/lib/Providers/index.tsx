'use client';
import { persistor, store } from '@/redux/store';
import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default Providers;
