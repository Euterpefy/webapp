// spotifyServices.ts

import { spotifyInstance } from '@/config/spotify-api';
import {
  SpotifyRecommendationParameters,
  SpotifyRecommendationResponse,
} from '@/types/spotify/recommendations';

export const fetchRecommendations = async (
  token: string,
  params: SpotifyRecommendationParameters
): Promise<SpotifyRecommendationResponse> => {
  const seedKeys: Array<keyof SpotifyRecommendationParameters> = [
    'seed_artists',
    'seed_genres',
    'seed_tracks',
  ];
  const seedValues: string[] = seedKeys.reduce((acc: string[], key) => {
    const value = params[key];
    // Ensure the value is an array before attempting to access its length or concatenate it
    if (Array.isArray(value) && value.length > 0) {
      return acc.concat(value);
    }
    return acc;
  }, []);

  if (seedValues.length === 0 || seedValues.length > 5) {
    throw new Error('The number of seeds must be between 1 and 5.');
  }

  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        queryParams.set(key, value.join(','));
      } else {
        queryParams.set(key, value.toString());
      }
    }
  }

  try {
    const response = await spotifyInstance(token).get('/recommendations', {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw new Error('Failed to fetch Spotify recommendations');
  }
};
