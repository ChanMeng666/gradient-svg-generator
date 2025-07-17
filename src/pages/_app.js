import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

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
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp; 