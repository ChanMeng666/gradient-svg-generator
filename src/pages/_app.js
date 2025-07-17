import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

function AppWithShortcuts({ children }) {
  useKeyboardShortcuts();
  return children;
}

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AppWithShortcuts>
        <Component {...pageProps} />
      </AppWithShortcuts>
    </QueryClientProvider>
  );
}

export default MyApp; 