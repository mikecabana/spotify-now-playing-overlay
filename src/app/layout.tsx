import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL(`https://spotify-now-playing-overlay.vercel.app`),
    title: 'Spotify Now Playing Overlay',
    description:
        'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
    openGraph: {
        title: 'Spotify Now Playing Overlay',
        description:
            'Display your currently playing track on Spotify. Embed in your websites or add to your stream overlays.',
        url: 'https://spotify-now-playing-overlay.vercel.app',
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
        <html lang="en">
            <body className={GeistSans.className}>
                {children}
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
