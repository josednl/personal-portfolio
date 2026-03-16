import { ReactNode } from 'react';
import { AppSettingsProvider } from '@/lib/context/AppSettingsContext';

// Simple wrapper for tests that need context
export const TestWrapper = ({ children }: { children: ReactNode }) => (
  <AppSettingsProvider>{children}</AppSettingsProvider>
);
