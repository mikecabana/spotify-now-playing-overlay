import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const spotifyMixUi = localFont({
    src: [
        {
            path: '../fonts/SpotifyMixUI-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/SpotifyMixUI-Bold.woff2',
            weight: '700',
            style: 'bold',
        },
    ],
    variable: '--font-spotify-mix-ui',
});

const spotifyMixUiTitle = localFont({
    src: '../fonts/SpotifyMixUITitleVariable.woff2',
    display: 'swap',
    variable: '--font-spotify-mix-ui-title',
});

export const description =
    'The easiest way to showcase your music. Display what your listening to on Spotify live. Embed on your websites or in you live streams.';

export const metadata: Metadata = {
    title: 'Spotify NPO',

    description,
    openGraph: {
        title: 'Spotify NPO',
        description,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Spotify NPO',
        description,
    },

    verification: {
        google: `${process.env.GOOGLE_SITE_VERIFICATION}`,
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
                <body className={`${spotifyMixUi.variable} ${spotifyMixUiTitle.variable} font-mix-ui`}>
                    {children}
                    <Toaster position="top-center" />
                </body>
            </html>
        </>
    );
}
