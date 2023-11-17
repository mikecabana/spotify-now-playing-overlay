'use client';
import { getSpotifyNowPlaying, refreshAccessToken } from '@/lib/spotify';
import { FC, useEffect, useRef, useState } from 'react';

type SpotifyNowPlayingProps = {
	refresh_token: string;
};

export const SpotifyNowPlaying: FC<SpotifyNowPlayingProps> = ({ refresh_token }) => {
	const timerIdRef = useRef<null | NodeJS.Timeout>(null);
	const [isPollingEnabled, setIsPollingEnabled] = useState(true);

	const [refreshToken, setRefreshToken] = useState(refresh_token);
	const [accessToken, setAccessToken] = useState('');

	const tryGetSpotifyNowPlaying = async (tryCount = 0, refresh = false) => {
		try {
			if (refresh) {
				const { accessToken: at, refreshToken: rt } = await refreshAccessToken({ refreshToken });
				setAccessToken(at);
				setRefreshToken(rt);
			}

			const { name } = await getSpotifyNowPlaying({ accessToken });
		} catch (error) {
			if (((error as Error).cause as any)?.status === 400 && tryCount < 3) {
				tryGetSpotifyNowPlaying(tryCount + 1, true);
			} else {
                console.log(error);
                setIsPollingEnabled(false);
            }
		}
	};

	useEffect(() => {
		const pollingCallback = async () => {
			await tryGetSpotifyNowPlaying();
		};

		const startPolling = () => {
			pollingCallback(); // To immediately start fetching data
			// Polling every 30 seconds
			timerIdRef.current = setInterval(pollingCallback, 3000);
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
	}, [isPollingEnabled]);

	return <>{isPollingEnabled ? 'now playing' : <button onClick={() => setIsPollingEnabled(true)}>retry</button>}</>;
};
