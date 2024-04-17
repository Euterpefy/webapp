// api/spotify/user-top-items.ts

import { spotifyInstance } from '@/config/spotify-api';
import { PagedResponse } from '@/types/spotify/pagination'; // Ensure you have defined these types

type TimeRange = 'long_term' | 'medium_term' | 'short_term';
type ItemType = 'artists' | 'tracks';

export const fetchUserTopItems = async <T>(
  accessToken: string,
  type: ItemType,
  timeRange: TimeRange = 'medium_term',
  limit: number = 20,
  offset: number = 0
): Promise<PagedResponse<T>> => {
  try {
    const response = await spotifyInstance(accessToken).get<PagedResponse<T>>(
      `/me/top/${type}`,
      {
        params: {
          time_range: timeRange,
          limit,
          offset,
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
    throw Error('Failed to fetch user top items');
  }
};

export default fetchUserTopItems;
