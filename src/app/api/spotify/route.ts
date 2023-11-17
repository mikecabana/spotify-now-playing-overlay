import { Users } from '@/lib/users';
import { cookies } from 'next/headers'

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);

    const c = cookies().get('');

	const id = searchParams.get('id');
	if (!id) {
		return Response.json({ error: "'id' query is required" }, { status: 400 });
	}

	const user = Users.get(id);
	if (!user) {
		return Response.json({ error: 'User not found' }, { status: 404 });
	}

	const { at, rt } = user;
};
