// api/spotify/auth.ts

import type { SessionToken } from '@/types/next-auth';
import axios from 'axios';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '';
const SPOTIFY_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? '';

export const refreshAccessToken = async (
  token: SessionToken
): Promise<SessionToken> => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      null,
      {
        params: {
          grant_type: 'refresh_token',
          refresh_token: token.refresh_token,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // Authorization header must contain the client_id and client_secret encoded in base64
          Authorization:
            'Basic ' +
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString('base64'),
        },
      }
    );

    return {
      ...token,
      refresh_token: response.data.refresh_token || token.refresh_token,
      access_token: response.data.access_token,
      expires_at: Date.now() + response.data.expires_in * 1000, // Calculate new expiry time
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token');
  }
};
