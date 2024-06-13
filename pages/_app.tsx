// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { PrefetchProvider } from '../contexts/PrefetchStats';
import '../styles/globals.css';  

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <PrefetchProvider>            
        <Component {...pageProps} />
        </PrefetchProvider>
    );
};

export default MyApp;
