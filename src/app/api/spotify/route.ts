import { getUserByEmail, updateUser } from "@/lib/db/users";
import { refreshAccessTokenServer } from "@/lib/spotify";

export const POST = async (request: Request) => {
  const { email } = await request.json();

  if (!email) {
    return Response.json(
      { error: "'email' in body is required" },
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);
  if (user) {
    const response = await refreshAccessTokenServer({
      refreshToken: user.rt,
    });

    if ("error" in response) {
      return Response.json(response, { status: 400 });
    }

    const { access_token, refresh_token, expires_in } = response;

    try {
      await updateUser(email, {
        at: access_token,
        rt: refresh_token ?? user.rt,
        exp: Math.floor(Date.now() / 1000) + expires_in,
      });
    } catch (error) {
      console.log(error);
      return Response.json({ error: "Failed to update user" }, { status: 500 });
    }

    return Response.json({ at: access_token }, { status: 201 });
  }
};
