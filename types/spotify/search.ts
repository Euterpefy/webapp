import { Album } from './album';
import { Artist } from './artist';
import { PagedResponse } from './pagination';
import { Playlist } from './playlist';
import { Track } from './track';

// Define the possible search types
export type SearchType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'track'
  | 'show'
  | 'episode'
  | 'audiobook';

export const defaultSearchTypes: SearchType[] = [
  'album',
  'artist',
  'playlist',
  'track',
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
