type SuccessResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
};

type ErrorResponse = {
  error: string;
  error_description: string;
};

export const refreshAccessTokenServer = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const clientId = `${process.env.AUTH_SPOTIFY_ID}`;
  const clientSecret = `${process.env.AUTH_SPOTIFY_SECRET}`;

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken);

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body,
    });

    const data = await res.json();
    const {
      access_token,
      token_type,
      scope,
      expires_in,
      refresh_token,
      error,
      error_description,
    } = data;

    if (error) {
      const errorResponse: ErrorResponse = {
        error,
        error_description,
      };
      return errorResponse;
    }

    const success: SuccessResponse = {
      access_token,
      token_type,
      scope,
      expires_in,

      refresh_token,
    };

    return success;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    if (res.status > 399 && res.status < 500) {
      throw new Error("Spotify:refresh token:auth error", {
        cause: {
          status: res.status,
          statusText: res.statusText,
          body: res.body,
        },
      });
    } else {
      throw new Error("Spotify:error", {
        cause: {
          status: res.status,
          statusText: res.statusText,
          body: res.body,
        },
      });
    }
  }

  const { accessToken, refreshToken: rt } = await res.json();
  return { accessToken, refreshToken: rt } as {
    accessToken: string;
    refreshToken: string;
  };
};

type SpotifyNowPlayingResponse = {
  image: { height: number; width: number; url: string } | null;
  artist: string | null;
  name: string | null;
  link: string | null;
};

export const getSpotifyNowPlaying = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<SpotifyNowPlayingResponse> => {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    if (res.status > 399 && res.status < 500) {
      throw new Error("Spotify:unauthenticated", {
        cause: { status: res.status, statusText: res.statusText },
      });
    } else {
      throw new Error("Spotify:error", {
        cause: { status: res.status, statusText: res.statusText },
      });
    }
  }
  if (res.status === 204) {
    // nothing is playing
    return { image: null, artist: null, name: null, link: null };
  }

  const data = await res.json();

  const { album, artists, name, external_urls } = data.item;
  const image = album.images[1];
  const artist = artists.map((a: any) => a.name).join(", ");

  const response: SpotifyNowPlayingResponse = {
    image,
    artist,
    name,
    link: external_urls.spotify,
  };
  return response;
};
