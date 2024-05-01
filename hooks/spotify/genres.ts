import { fetchGenres } from "@/lib/api/spotify/genre";
import { type UseQueryResult, useQuery } from "react-query";

const useGenres = (
  token: string | undefined,
): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>(
    ["genres-seeds"],
    async () => {
      // Ensure token is defined before making the API call
      if (!token) {
        // Throw an error or return a resolved promise with a default value
        throw new Error("Token is undefined");
      }
      return await fetchGenres(token);
    },
    {
      enabled: !!token, // Only enable the query if accessToken is truthy
      staleTime: 1000 * 60 * 60 * 24, // Optional: 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // Optional: 24 hours
      retry: false, // Optional: do not retry after a failed attempt
      onError: (error: Error) => {
        console.error("Error fetching genres:", error);
      },
    },
  );
};

export default useGenres;
