export const refreshAccessTokenServer = async ({ refreshToken }: { refreshToken: string }) => {
	const clientId = `${process.env.SPOTIFY_CLIENT_ID}`;
	const clientSecret = `${process.env.SPOTIFY_CLIENT_SECRET}`;

	const body = new URLSearchParams();
	body.append('grant_type', encodeURIComponent('refresh_token'));
	body.append('refresh_token', encodeURIComponent(refreshToken));

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
		},
		body,
	});

	if (!res.ok) {
		if (res.status > 399 && res.status < 500) {
			throw new Error('spotify:refresh-token:auth-error', {
				cause: { status: res.status, statusText: res.statusText },
			});
		} else {
			throw new Error('spotify:refresh-token:error', {
				cause: { status: res.status, statusText: res.statusText },
			});
		}
	}

	const { access_token, refresh_token } = await res.json();
	return { access_token, refresh_token } as { access_token: string; refresh_token: string };
};

export const refreshAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
	const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;

	const body = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: clientId,
	});

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	});

	if (!res.ok) {
		if (res.status > 399 && res.status < 500) {
			throw new Error('Spotify:refresh token:auth error', {
				cause: { status: res.status, statusText: res.statusText, body: res.body },
			});
		} else {
			throw new Error('Spotify:error', {
				cause: { status: res.status, statusText: res.statusText, body: res.body },
			});
		}
	}

	const { accessToken, refreshToken: rt } = await res.json();
	return { accessToken, refreshToken: rt } as { accessToken: string; refreshToken: string };
};

export const getSpotifyNowPlaying = async ({ accessToken }: { accessToken: string }) => {
	const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		if (res.status > 399 && res.status < 500) {
			throw new Error('Spotify:refresh token:auth error', {
				cause: { status: res.status, statusText: res.statusText },
			});
		} else {
			throw new Error('Spotify:error', {
				cause: { status: res.status, statusText: res.statusText },
			});
		}
	}
	const data = await res.json();
	if (typeof data === 'string') {
		// noting is playing
		return { image: null, artists: null, name: null };
	}

	const { album, artists, name } = data.input;
	const image = album.images[0];
	return { image, artists, name };
};
