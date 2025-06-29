import { useEffect, useState } from 'react';

export const useFarcaster = () => {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectFarcaster = () => {
      if (typeof window === 'undefined') {
        setIsFarcaster(false);
        setIsLoading(false);
        return;
      }

      const isFarcasterMiniApp = 
        // Check URL patterns
        window.location.href.includes('warpcast.com') || 
        window.location.href.includes('farcaster.xyz') ||
        window.location.href.includes('fc.') ||
        // Check user agent
        window.navigator.userAgent.includes('Farcaster') ||
        window.navigator.userAgent.includes('Warpcast') ||
        // Check for Farcaster-specific properties
        !!(window as any).farcaster ||
        !!(window as any).fc ||
        !!(window as any).__FARCASTER__ ||
        // Check for Farcaster frame context
        document.querySelector('meta[name="fc:frame"]') !== null;

      setIsFarcaster(isFarcasterMiniApp);
      setIsLoading(false);
      
      console.log('Farcaster detection result:', isFarcasterMiniApp);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(detectFarcaster, 50);
    return () => clearTimeout(timer);
  }, []);

  return { isFarcaster, isLoading };
}; 