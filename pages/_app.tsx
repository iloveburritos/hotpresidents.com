// pages/_app.tsx
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../hooks/usePrefetch';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Call ready when the app is loaded and ready for Farcaster Frame
    const initializeFrame = async () => {
      try {
        const { sdk } = await import('@farcaster/frame-sdk');
        await sdk.actions.ready();
      } catch (error) {
        // Silently fail if not in a frame or SDK not available
        console.log('Not in Farcaster Frame or SDK not available');
      }
    };

    initializeFrame();
  }, []);

  return (
    <PrefetchProvider>
      <Component {...pageProps} />
    </PrefetchProvider>
  );
};

export default MyApp;
