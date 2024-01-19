import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export { AppProvider }