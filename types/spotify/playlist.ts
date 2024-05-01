import { type ExternalUrls, type Followers, type SpotifyImage } from ".";
import { type SimplifiedTrack } from "./track";
import { type SimplifiedUser } from "./user";

export interface NewPlaylist {
  name: string;
  public: boolean;
  collaborative: boolean;
  description?: string;
}

export interface CreatePlaylistRequest {
  new_playlist: NewPlaylist;
  track_ids: string[];
}

export interface Playlist {
  collaborative: boolean;
  description?: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SimplifiedUser;
  public: boolean;
  snapshot_id: string;
  tracks: SimplifiedPlaylistTracks;
}

export interface PlaylistTrack {
  added_at: string;
  added_by: SimplifiedUser;
  is_local: boolean;
  track: SimplifiedTrack;
}

export interface SimplifedPlaylist {
  collaborative: boolean;
  description?: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SimplifiedUser;
  public?: boolean;
  snapshot_id: string;
  tracks: SimplifiedPlaylistTracks;
}

export interface SimplifiedPlaylistTracks {
  href: string;
  total: number;
}
