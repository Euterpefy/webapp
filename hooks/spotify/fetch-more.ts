import { useInfiniteQuery } from 'react-query';
import { spotifyInstance } from '@/config/spotify-api';
import { PagedResponse } from '@/types/spotify/pagination';
import { AxiosError } from 'axios'; // Import this if you're using Axios for HTTP requests

interface FetchMoreItemsReturn<T> {
  data: T[];
  fetchMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  error: Error | null; // Specify that error should be an instance of Error or null
  status: 'loading' | 'error' | 'success' | 'idle';
}

/**
 * Hook to incrementally fetch data from a paged API endpoint.
 * @param accessToken - The access token for authentication with the API.
 * @param initialUrl - The initial URL to start fetching from.
 * @param options - Options including limit for the initial fetch.
 * @returns An object containing data, fetchMore function, hasNext state, error, loading, and status.
 */
function useFetchMoreItems<T>(
  accessToken: string,
  initialUrl: string,
  limit: number = 20
): FetchMoreItemsReturn<T> {
  const fetchItems = async ({ pageParam = `${initialUrl}?limit=${limit}` }) => {
    try {
      const response = await spotifyInstance(accessToken).get<PagedResponse<T>>(
        pageParam
      );
      return response.data; // Successfully fetched data
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message); // Casting to AxiosError and rethrowing as generic Error
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PagedResponse<T>, Error>(
    ['fetchMoreItems', accessToken, initialUrl],
    fetchItems,
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  const fetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    data: data?.pages.flatMap((page) => page.items) ?? [],
    fetchMore,
    hasMore: !!hasNextPage,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    error, // Return error as part of the hook's return object
    status,
  };
}

export { useFetchMoreItems };
