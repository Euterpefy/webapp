/* eslint-disable */

import { spotifyInstance } from "@/config/spotify-api";
import { PagedResponse } from "@/types/spotify/pagination";
import { HttpStatusCode } from "axios";

/**
 * Recursively fetches all items from a paged API endpoint.
 * @param accessToken - The access token for authentication with the API.
 * @param url - url to fetch the paged response of type T
 * @returns - A promise that resolves to an array of all items across all pages.
 */
async function fetchAllItems<T>(
  accessToken: string,
  url: string,
): Promise<T[]> {
  const initialResponse =
    await spotifyInstance(accessToken).get<PagedResponse<T>>(url);

  let items: T[] = [...initialResponse.data.items];
  let nextUrl = initialResponse.data.next;
  try {
    while (nextUrl) {
      console.log(nextUrl);
      const response =
        await spotifyInstance(accessToken).get<PagedResponse<T>>(nextUrl);

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

interface Params {
  limit?: number;
  offset?: number;
  [key: string]: any;
}

/**
 * Fetches a specified number of pages of items from a paged API endpoint.
 * @param accessToken - The access token for authentication with the API.
 * @param url - The URL to fetch the paged response of type T.
 * @param pages - The number of pages to fetch (default is 1).
 * @param params - Optional parameters to include in the initial request. Includes:
 * @param params.limit - The number of items to fetch per page.
 * @param params.offset - The starting offset for the first page.
 * @param params[key] - Any additional parameters to include in the request.
 * @returns - A promise that resolves to an array of all items across the specified pages.
 */
async function fetchPagedItems<T>(
  accessToken: string,
  url: string,
  pages: number = 1,
  params?: Params,
): Promise<T[]> {
  let items: T[] = [];
  let currentPage = 1;
  let nextUrl: string | undefined = url;

  try {
    while (currentPage <= pages && nextUrl) {
      const response = await spotifyInstance(accessToken).get<PagedResponse<T>>(
        nextUrl,
        params ? { params } : undefined,
      );
      if (!(response.status === HttpStatusCode.Ok)) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const pageData: PagedResponse<T> = response.data;
      items = items.concat(pageData.items);
      nextUrl = pageData.next;
      currentPage++;

      // Use nextUrl for subsequent requests, not the initial params
      params = undefined;
    }
  } catch (e) {
    console.error(e);
  }

  return items;
}

export { fetchAllItems, fetchPagedItems };
