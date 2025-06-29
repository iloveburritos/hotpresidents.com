// components/FarcasterDebug.tsx
import React from 'react';
import { useFarcaster } from '../hooks/useFarcaster';

const FarcasterDebug: React.FC = () => {
  const { isFarcaster, isLoading } = useFarcaster();

  if (!isFarcaster) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '200px'
    }}>
      <div>🔍 Farcaster Debug</div>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Environment: {isFarcaster ? 'Mini App' : 'Browser'}</div>
      <div>URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</div>
      <div>User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 50) + '...' : 'SSR'}</div>
    </div>
  );
};

export default FarcasterDebug; 