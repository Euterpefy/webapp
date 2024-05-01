// api/spotify/genre.ts

import { spotifyInstance } from "@/config/spotify-api";

const fetchGenres = async (accessToken: string): Promise<string[]> => {
  const response = await spotifyInstance(accessToken).get(
    "/recommendations/available-genre-seeds",
  );
  return response.data.genres;
};

export { fetchGenres };
