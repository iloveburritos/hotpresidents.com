// pages/_app.tsx
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../hooks/usePrefetch';
import { useFarcaster } from '../hooks/useFarcaster';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { isFarcaster, isLoading } = useFarcaster();

  useEffect(() => {
    // Initialize Farcaster Frame SDK only when running as a mini app
    const initializeFarcasterSDK = async () => {
      if (isLoading) return; // Wait for detection to complete
      
      if (!isFarcaster) {
        console.log('Not in Farcaster environment, skipping SDK initialization');
        return;
      }

      try {
        console.log('Detected Farcaster environment, initializing SDK...');

        // Dynamic import to avoid SSR issues
        const { sdk } = await import('@farcaster/frame-sdk');
        
        // Call ready to dismiss the splash screen when the app is ready
        await sdk.actions.ready();
        console.log('Farcaster SDK initialized successfully - splash screen dismissed');
      } catch (error) {
        console.error('Farcaster SDK initialization failed:', error);
        
        // Fallback: try to dismiss splash screen even if SDK fails
        try {
          if (typeof window !== 'undefined' && (window as any).fc) {
            console.log('Attempting fallback splash screen dismissal...');
            // Some Farcaster clients might have a global fc object
            (window as any).fc?.ready?.();
          }
        } catch (fallbackError) {
          console.log('Fallback splash screen dismissal also failed:', fallbackError);
        }
      }
    };

    initializeFarcasterSDK();
  }, [isFarcaster, isLoading]);

  return (
    <PrefetchProvider>
      <Component {...pageProps} />
    </PrefetchProvider>
  );
};

export default MyApp;
