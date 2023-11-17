import { SpotifyNowPlaying } from '@/components/spotify-now-playing';
import { getSpotifyNowPlaying, refreshAccessTokenServer } from '@/lib/spotify';

export default function Spotify(ctx: any) {
	const { rt } = ctx.searchParams;

	// let { access_token, refresh_token } = await refreshAccessTokenServer({ refreshToken: rt });

	// const {} = await getSpotifyNowPlaying({ accessToken: access_token });

	return (
		<main className='p-4'>
			<SpotifyNowPlaying refresh_token={`${rt}`} />
		</main>
	);
}
