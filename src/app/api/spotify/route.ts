import { getUserByEmail, updateUser } from '@/lib/db/users';
import { refreshAccessTokenServer } from '@/lib/spotify';

export const POST = async (request: Request) => {
    const { email } = await request.json();

    if (!email) {
        return Response.json({ error: "'email' in body is required" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (user) {
        const { access_token, refresh_token, token_type, expires_in, scope } = await refreshAccessTokenServer({
            refreshToken: user.rt,
        });
        await updateUser(email, {
            at: access_token,
            rt: refresh_token ?? user.rt,
            exp: Math.floor(Date.now() / 1000) + expires_in,
        });

        return Response.json({ at: access_token }, { status: 201 });
    }
};
