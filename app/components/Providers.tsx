// src/components/Providers.tsx (or wherever you prefer)
"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '@/app/store'; // Adjust import path as needed
// import { Session } from "next-auth";
interface ProvidersProps {
  children: React.ReactNode;
//   session: Session | null;
}

export function Providers({ children}: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}