import { useEffect, useState } from 'react';

export const useFarcaster = () => {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use requestIdleCallback to defer detection until browser is idle
    // This prevents blocking the initial render
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
    };

    // Use requestIdleCallback if available, otherwise use setTimeout with longer delay
    if ('requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(detectFarcaster, { timeout: 1000 });
      return () => (window as any).cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(detectFarcaster, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return { isFarcaster, isLoading };
}; 