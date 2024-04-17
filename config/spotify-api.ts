import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';
export const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? 'asdasd';
export const SPOTIFY_CLIENT_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '';
export const SPOTIFY_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? '';

export const spotifyInstance = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
