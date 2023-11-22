import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Spotify Now Playing Overlay',
    description:
        'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
    openGraph: {
        title: 'Spotify Now Playing Overlay',
        description:
            'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Spotify Now Playing Overlay',
        description:
            'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script
                async
                src="https://analytics.eu.umami.is/script.js"
                data-website-id="8c33b96a-3845-4323-b8f1-457d1403ace4"
            />
            <html lang="en">
                <body className={GeistSans.className}>
                    {children}
                    <Toaster position="top-center" />
                </body>
            </html>
        </>
    );
}
