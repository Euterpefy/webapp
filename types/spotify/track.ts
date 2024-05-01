import {
  type ExternalIds,
  type ExternalUrls,
  type SpotifyRestrictions,
} from ".";
import { type SimplifiedAlbum } from "./album";

export interface Track {
  album: SimplifiedAlbum;
  artists: TrackArtist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  restrictions: SpotifyRestrictions;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SimplifiedTrack {
  album: SimplifiedAlbum;
  artists: TrackArtist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  restrictions: SpotifyRestrictions;
  name: string;
  preview_url?: string;
}

export interface TrackArtist {
  id: string;
  name: string;
}
