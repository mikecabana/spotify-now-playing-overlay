import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

const host = 'https://spotify-now-playing-overlay.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(`${host}`),
    title: 'Spotify Now Playing Overlay',
    description:
        'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
    openGraph: {
        title: 'Spotify Now Playing Overlay',
        description:
            'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
        url: `${host}`,
        type: 'website',
        images: [
            {
                url: `${host}/opengraph-image.png`,
                width: 1200,
                height: 630,
            },
        ],
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
