import { type SpotifyImage } from ".";

export interface Category {
  href: string;
  icons: SpotifyImage[];
  id: string;
  name: string;
}
