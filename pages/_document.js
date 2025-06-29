// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';


export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Exo+2:wght@500&display=swap"
                    rel="stylesheet"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
                <link rel="shortcut icon" href="/static/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                
                {/* Farcaster Frame Metadata */}
                <meta property="og:title" content="Hot Presidents" />
                <meta property="og:description" content="Hotus or Notus? Cast your vote now!" />
                <meta property="og:url" content="https://hotpresidents.com" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://hotpresidents.com/static/bazaart.png" />
                <meta
                  name="fc:frame"
                  content={JSON.stringify({
                    version: "next",
                    imageUrl: "https://hotpresidents.com/static/bazaart.png",
                    button: {
                      title: "Hotus or Notus",
                      action: {
                        type: "launch_frame",
                        name: "HotPresidents",
                        url: "https://hotpresidents.com",
                        splashImageUrl: "https://hotpresidents.com/static/bazaart.png",
                        splashBackgroundColor: "#ffffff"
                      }
                    }
                  })}
                />
                <meta name="fc:frame:image" content="https://hotpresidents.com/static/bazaart.png" />
            </Head>
            <body>
            <div id="container">
                <Main />
            
                <NextScript />
                <Analytics mode={'production'} />
                <SpeedInsights />
                </div>
            </body>
        </Html>
    );
}
