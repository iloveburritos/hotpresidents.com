// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../contexts/PrefetchStats';
import '../styles/globals.css';  
import { Analytics } from "@vercel/analytics/react"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <PrefetchProvider>            
        <Component {...pageProps} />
        </PrefetchProvider>
    );
};

export default MyApp;
