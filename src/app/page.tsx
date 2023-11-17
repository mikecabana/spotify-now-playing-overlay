import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			{/* <SignIn provider='spotify'>Sign In</SignIn> */}
			{/* <SignOut>Sign Out</SignOut> */}
			<Link href={'/api/auth/signin'}>Sign In</Link>
			<Link href={'/api/auth/signout'}>Sign Out</Link>
			<pre className='whitespace-pre-wrap break-all max-w-3/4 w-full'>{JSON.stringify(session, null, 2)}</pre>
			<Link href={`/spotify?rt=${(session as any)?.spotify_refresh_token}`}>Go to now playing</Link>
		</main>
	);
}
