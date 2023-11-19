export const refreshAccessTokenServer = async ({ refreshToken }: { refreshToken: string }) => {
    const clientId = `${process.env.SPOTIFY_CLIENT_ID}`;
    const clientSecret = `${process.env.SPOTIFY_CLIENT_SECRET}`;

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);

    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            },
            body,
        });

        return (await res.json()) as {
            access_token: string;
            token_type: string;
            scope: string;
            expires_in: number;
            refresh_token?: string;
        };
    } catch (error) {
        console.log(error);
        throw error;
    }

    // if (!res.ok) {
    //     if (res.status > 399 && res.status < 500) {
    //         throw new Error('spotify:refresh-token:auth-error', {
    //             cause: { status: res.status, statusText: res.statusText },
    //         });
    //     } else {
    //         throw new Error('spotify:refresh-token:error', {
    //             cause: { status: res.status, statusText: res.statusText },
    //         });
    //     }
    // }
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
            throw new Error('Spotify:unauthenticated', {
                cause: { status: res.status, statusText: res.statusText },
            });
        } else {
            throw new Error('Spotify:error', {
                cause: { status: res.status, statusText: res.statusText },
            });
        }
    }
    if (res.status === 204) {
        // nothing is playing
        return { image: null, artist: null, name: null };
    }

    const data = await res.json();

    const { album, artists, name } = data.item;
    const image = album.images[1];
    const artist = artists.map((a: any) => a.name).join(', ');    
    return { image, artist, name } as {
        name: string;
        artist: string;
        image: { height: number; width: number; url: string };
    };
};
