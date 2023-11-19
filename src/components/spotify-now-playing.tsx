'use client';
import { getSpotifyNowPlaying, refreshAccessToken, refreshAccessTokenServer } from '@/lib/spotify';
import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Music4 } from 'lucide-react';

type SpotifyNowPlayingProps = {
    email: string;
    at: string;
};

export const SpotifyNowPlaying: FC<SpotifyNowPlayingProps> = ({ email, at: _at }) => {
    const timerIdRef = useRef<null | NodeJS.Timeout>(null);
    const [isPollingEnabled, setIsPollingEnabled] = useState(true);

    const [at, setAt] = useState(_at);

    const [name, setName] = useState<string | null>('');
    const [artist, setArtist] = useState<string | null>('');
    const [image, setImage] = useState<any | null>(null);

    useEffect(() => {
        const pollingCallback = async () => {
            try {
                const { image, name, artist } = await getSpotifyNowPlaying({ accessToken: at });
                setName(name);
                setArtist(artist);
                setImage(image);
            } catch (error) {
                console.log(error);

                if ((error as Error).message === 'Spotify:unauthenticated') {
                    // POST to refresh token
                    const res = await fetch('http://localhost:3000/api/spotify', {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({ email }),
                    });
                    const { at } = await res.json();
                    setAt(at);
                    setIsPollingEnabled(true);
                } else {
                    setIsPollingEnabled(false);
                }
            }
        };

        const startPolling = () => {
            pollingCallback(); // To immediately start fetching data
            // Polling every x milliseconds
            timerIdRef.current = setInterval(pollingCallback, 12000);
        };

        const stopPolling = () => {
            if (timerIdRef.current) clearInterval(timerIdRef.current);
        };

        if (isPollingEnabled) {
            startPolling();
        } else {
            stopPolling();
        }

        return () => {
            stopPolling();
        };
    }, [at, email, isPollingEnabled]);

    return (
        <>
            {isPollingEnabled ? (
                <div className="flex items-center gap-5 bg-black rounded-lg p-4 text-white border border-zinc-800 relative overflow-hidden">
                    <div className="absolute bg-gradient-to-l from-black via-black to-transparent top-0 bottom-0 right-0 h-full w-8 z-10 rounded-r-lg"></div>
                    <div className={`overflow-hidden rounded shrink-0`}>
                        {image ? (
                            <Image width={100} height={100} src={image.url} alt={`${artist}, ${name} album art`} />
                        ) : (
                            <div className="w-[100px] h-[100px] flex items-center justify-center bg-zinc-500">
                                <Music4 className='text-zinc-700 w-10 h-10' />
                            </div>
                        )}
                    </div>
                    <div className="shrink grow">
                        <div className="text-2xl w-full whitespace-nowrap relative">{name ?? 'Nothing playing'}</div>
                        {artist && (
                            <div className="text-lg w-full whitespace-nowrap relative">
                                <span className="opacity-60">{artist}</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                'make sure you have logged in at least once then refresh'
            )}
        </>
    );
};
