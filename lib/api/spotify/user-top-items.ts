// api/spotify/user-top-items.ts

import { spotifyInstance } from '@/config/spotify-api';
import type { PagedResponse } from '@/types/spotify/pagination'; // Ensure you have defined these types
import { fetchPagedItems } from './fetch-pages';

type TimeRange = 'long_term' | 'medium_term' | 'short_term';
type ItemType = 'artists' | 'tracks';

const fetchUserTopItems = async <T>(
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

/**
 * Fetches a specified number of pages of user top items.
 * @param accessToken - The access token for authentication with the API.
 * @param type - The type of items to fetch ('artists' or 'tracks').
 * @param timeRange - The time range to fetch the items for (default is 'medium_term').
 * @param limit - The number of items to fetch per page (default is 20).
 * @param offset - The starting offset for the first page (default is 0).
 * @param pages - The number of pages to fetch (default is 1).
 * @returns - A promise that resolves to an array of all items across the specified pages.
 */
const fetchUserTopItemsPages = async <T>(
  accessToken: string,
  type: ItemType,
  timeRange: TimeRange = 'medium_term',
  limit: number = 20,
  offset: number = 0,
  pages: number = 1
): Promise<T[]> => {
  const url = `/me/top/${type}`;
  const params = { time_range: timeRange, limit, offset };
  return await fetchPagedItems<T>(accessToken, url, pages, params);
};

export { fetchUserTopItems, fetchUserTopItemsPages };
