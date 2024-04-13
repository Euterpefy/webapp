// hooks/useGenres.ts

import { fetchGenres } from '@/api/spotify/genre';
import { useQuery } from 'react-query';

const useGenres = (token: string | undefined) => {
  return useQuery(['genres-seeds'], () => fetchGenres(token!), {
    enabled: !!token, // Only enable the query if accessToken is truthy
    staleTime: 1000 * 60 * 60 * 24, // Optional: 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Optional: 24 hours
    retry: false, // Optional: do not retry after a failed attempt
    onError: (error: any) => {
      console.error('Error fetching genres:', error);
    },
  });
};

export default useGenres;
