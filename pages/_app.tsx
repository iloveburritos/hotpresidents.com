// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../contexts/PrefetchStats';
import '../styles/globals.css';  
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <PrefetchProvider>            
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
        </PrefetchProvider>
    );
};

export default MyApp;