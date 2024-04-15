import { spotifyInstance } from '@/config/spotify-api';
import { PagedResponse } from '@/types/spotify/pagination';
import { HttpStatusCode } from 'axios';

/**
 * Recursively fetches all items from a paged API endpoint.
 *
 * @param initialResponse - The initial paged response from the API.
 * @param accessToken - The access token for authentication with the API.
 * @returns - A promise that resolves to an array of all items across all pages.
 */
async function fetchAllItems<T>(
  accessToken: string,
  url: string
): Promise<T[]> {
  const initialResponse = await spotifyInstance(accessToken).get<
    PagedResponse<T>
  >(url);

  let items: T[] = [...initialResponse.data.items];
  let nextUrl = initialResponse.data.next;
  try {
    while (nextUrl) {
      console.log(nextUrl);
      const response = await spotifyInstance(accessToken).get<PagedResponse<T>>(
        nextUrl
      );

      if (!(response.status === HttpStatusCode.Ok)) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const pageData: PagedResponse<T> = response.data;
      items = items.concat(pageData.items);
      nextUrl = pageData.next; // Update nextUrl with the next page's URL if it exists
    }
  } catch (e) {
    console.error(e);
  }

  return items;
}

export { fetchAllItems };
