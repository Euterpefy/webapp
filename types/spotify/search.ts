import { type Album } from "./album";
import { type Artist } from "./artist";
import { type PagedResponse } from "./pagination";
import { type Playlist } from "./playlist";
import { type Track } from "./track";

// Define the possible search types
export type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode"
  | "audiobook";

export const defaultSearchTypes: SearchType[] = [
  "album",
  "artist",
  "playlist",
  "track",
];

export interface SearchRequestParams {
  q: string;
  type: SearchType[];
  market?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  tracks?: PagedResponse<Track>;
  artists?: PagedResponse<Artist>;
  albums?: PagedResponse<Album>;
  playlists?: PagedResponse<Playlist>;
}
