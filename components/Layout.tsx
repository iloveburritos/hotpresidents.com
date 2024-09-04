// components/Layout.tsx
import React, { ReactNode } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import {Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"


interface LayoutProps {
    children: ReactNode;
    pageTitle?: string;
    pageDescription?: string;
    pageImage?: string;
    pageUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    pageTitle = "Hot or Not Presidents",
    pageDescription = "Hotus or Notus? Who's the hottest potus of them all?",
    pageImage = "/static/bazaart.png",
    pageUrl = "https://www.hotpresidents.com"
}) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`${pageTitle}`}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="hotus or notus" />
                <meta name="twitter:url" content={pageUrl} />
            </Head>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-KGQDF0YR1G"
                strategy="afterInteractive"
            />
            <Script id="gtag-init">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KGQDF0YR1G');`}
            </Script>
            <main>
                <div id="container">{children}</div>
                <Analytics />
                <SpeedInsights />
            </main>
        </>
    );
};

export default Layout;