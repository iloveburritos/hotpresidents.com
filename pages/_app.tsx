// pages/_app.tsx
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../hooks/usePrefetch';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Removed Farcaster Frame SDK initialization
  }, []);

  return (
    <PrefetchProvider>
      <Component {...pageProps} />
    </PrefetchProvider>
  );
};

export default MyApp;
