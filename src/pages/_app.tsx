import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

const MobileNav = dynamic(() => import('../components/layout/MobileNav'), { ssr: false });

function AppWithShortcuts({ children }: { children: ReactNode }) {
  useKeyboardShortcuts();
  return (
    <>
      {children}
      <MobileNav />
    </>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  // Register service worker for PWA
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('Service Worker registered:', registration);
          },
          (error) => {
            console.log('Service Worker registration failed:', error);
          },
        );
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppWithShortcuts>
        <Component {...pageProps} />
      </AppWithShortcuts>
    </QueryClientProvider>
  );
}
