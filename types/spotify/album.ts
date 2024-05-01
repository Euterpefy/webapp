import { type SpotifyImage } from "next-auth/providers/spotify";
import { type ExternalUrls, type SpotifyRestrictions } from ".";
import { type SimplifiedArtist } from "./artist";

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: SpotifyRestrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
}

export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  artists: SimplifiedArtist[];
}
