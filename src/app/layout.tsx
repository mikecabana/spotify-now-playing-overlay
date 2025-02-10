import { ConsentBanner } from '@/components/consent';
import { description } from '@/lib/meta';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { getCookieConsent } from './actions';
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const gtmId = process.env.GOOGLE_TAG_MANAGER_ID as string;

    const consent = await getCookieConsent();
    const showConsentBanner = consent === undefined;

    return (
        <>
            <html lang="en">
                <GoogleTagManager gtmId={gtmId} />
                <body className={`${spotifyMixUi.variable} ${spotifyMixUiTitle.variable} font-mix-ui`}>
                    {children}
                    <Toaster position="top-center" />
                    <ConsentBanner show={showConsentBanner} />
                </body>
            </html>
        </>
    );
}
