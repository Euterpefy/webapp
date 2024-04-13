export interface ExternalUrls {
  spotify: string;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface Followers {
  href?: string;
  total: number;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface SpotifyRestrictions {
  reason: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}
