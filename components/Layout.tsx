// components/Layout.tsx
import React, { ReactNode, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import {Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"

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
    pageImage = "/static/bazaart.webp",
    pageUrl = "https://www.hotpresidents.com"
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);
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
                strategy="lazyOnload"
            />
            <Script id="gtag-init" strategy="lazyOnload">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KGQDF0YR1G');`}
            </Script>
            <main>
                {/* Desktop Navigation */}
                <nav className="fixed top-4 right-4 z-50 hidden md:flex gap-3">
                    <a 
                        href="https://github.com/iloveburritos/hotpresidents.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="View on GitHub"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <Link 
                        href="/rankings" 
                        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="View Rankings"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 13h2v8H3zm4-6h2v14H7zm4-6h2v20h-2zm4 2h2v18h-2zm4 5h2v13h-2z"/>
                        </svg>
                    </Link>
                </nav>

                {/* Mobile Burger Menu */}
                <div ref={menuRef} className="fixed top-4 right-4 z-50 md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                    >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px]">
                            <a 
                                href="https://github.com/iloveburritos/hotpresidents.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                            <Link 
                                href="/rankings"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 13h2v8H3zm4-6h2v14H7zm4-6h2v20h-2zm4 2h2v18h-2zm4 5h2v13h-2z"/>
                                </svg>
                                Rankings
                            </Link>
                        </div>
                    )}
                </div>
                <div id="container">{children}</div>
                <Analytics />
                <SpeedInsights />
            </main>
        </>
    );
};

export default Layout;