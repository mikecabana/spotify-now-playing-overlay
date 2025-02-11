import { description } from "@/lib/meta";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers as nextHeaders } from "next/headers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const spotifyMixUi = localFont({
  src: [
    {
      path: "../fonts/SpotifyMixUI-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SpotifyMixUI-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-spotify-mix-ui",
});

const spotifyMixUiTitle = localFont({
  src: "../fonts/SpotifyMixUITitleVariable.woff2",
  display: "swap",
  variable: "--font-spotify-mix-ui-title",
});

export const metadata: Metadata = {
  title: "Spotify NPO",

  description,
  openGraph: {
    title: "Spotify NPO",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotify NPO",
    description,
  },

  verification: {
    google: `${process.env.GOOGLE_SITE_VERIFICATION}`,
  },

  other: {
    "color-scheme": "light dark",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.GOOGLE_TAG_MANAGER_ID as string;

  const headers = await nextHeaders();
  const path = headers.get("x-path");

  return (
    <>
      <html lang="en">
        <GoogleTagManager gtmId={gtmId} />
        <body
          className={`${spotifyMixUi.variable} ${spotifyMixUiTitle.variable} ${
            path === "/" ? "" : "widget"
          } font-mix-ui`}
        >
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </>
  );
}
