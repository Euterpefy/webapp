// api/spotify/search.ts

import { spotifyInstance } from '@/config/spotify-api';
import { SearchRequestParams, SearchResult } from '@/types/spotify/search';

export const searchSpotify = async (
  accessToken: string,
  params: SearchRequestParams
): Promise<SearchResult> => {
  try {
    const queryParams = new URLSearchParams();
    console.log(params);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          queryParams.set(key, value.join(','));
        } else {
          queryParams.set(key, value.toString());
        }
      }
    }

    const response = await spotifyInstance(accessToken).get('/search', {
      params: queryParams,
    });

    return response.data as SearchResult;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    throw error;
  }
};
