// pages/_app.tsx
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../hooks/usePrefetch';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Initialize Farcaster Frame SDK only when running as a mini app
    const initializeFarcasterSDK = async () => {
      try {
        // Check if we're in a Farcaster mini app environment
        const isFarcasterMiniApp = 
          typeof window !== 'undefined' && 
          (window.location.href.includes('warpcast.com') || 
           window.location.href.includes('farcaster.xyz') ||
           window.navigator.userAgent.includes('Farcaster') ||
           // Check for Farcaster-specific environment variables or properties
           (window as any).farcaster ||
           (window as any).fc);

        if (!isFarcasterMiniApp) {
          console.log('Not in Farcaster environment, skipping SDK initialization');
          return;
        }

        // Dynamic import to avoid SSR issues
        const { sdk } = await import('@farcaster/frame-sdk');
        
        // Call ready to dismiss the splash screen when the app is ready
        await sdk.actions.ready();
        console.log('Farcaster SDK initialized successfully');
      } catch (error) {
        console.log('Farcaster SDK not available or failed to initialize:', error);
      }
    };

    initializeFarcasterSDK();
  }, []);

  return (
    <PrefetchProvider>
      <Component {...pageProps} />
    </PrefetchProvider>
  );
};

export default MyApp;
