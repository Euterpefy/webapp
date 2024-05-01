import {
  type ExplicitContent,
  type ExternalUrls,
  type Followers,
  type SpotifyImage,
} from ".";

export interface User {
  display_name: string;
  external_urls: ExternalUrls;
  followers?: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  email?: string;
  type: string;
  uri: string;
  country?: string;
  product?: string;
  explicit_content?: ExplicitContent;
}

export interface SimplifiedUser {
  external_urls: ExternalUrls;
  followers?: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}
