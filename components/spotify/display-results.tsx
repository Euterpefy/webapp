import { SearchResult } from '@/types/spotify/search';
import { Label } from '@/components/ui/label';
import {
  DisplayBox,
  DisplayBoxHeader,
  DisplayBoxItems,
  DisplayBoxLabel,
  DisplayBoxPagination,
} from './displays/box';
import { Track } from '@/types/spotify/track';
import { Artist } from '@/types/spotify/artist';
import { Album } from '@/types/spotify/album';
import { Playlist } from '@/types/spotify/playlist';
import React from 'react';
import DisplayAlbum from './displays/album';
import DisplayPlaylist from './displays/playlist';
import DisplayArtist from './displays/artist';
import DisplayTrack from './displays/track';

interface SearchResultsDisplayProps {
  results: SearchResult;
}
const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({
  results,
}) => {
  const { tracks, playlists, albums, artists } = results;

  return (
    <div className="flex flex-col gap-4 px-1">
      <Label className="text-2xl font-bold">Top Results</Label>
      {tracks && tracks.items.length > 0 && (
        <DisplayBox>
          <DisplayBoxHeader>
            <DisplayBoxLabel>Tracks</DisplayBoxLabel>
            <DisplayBoxPagination />
          </DisplayBoxHeader>
          <DisplayBoxItems<Track>
            pagedItems={tracks}
            displayItem={(track) => <DisplayTrack track={track} />}
          />
        </DisplayBox>
      )}

      {artists && artists.items.length > 0 && (
        <DisplayBox>
          <DisplayBoxHeader>
            <DisplayBoxLabel>Artists</DisplayBoxLabel>
            <DisplayBoxPagination />
          </DisplayBoxHeader>
          <DisplayBoxItems<Artist>
            itemsPerCol={1}
            pagedItems={artists}
            displayItem={(artist) => {
              return <DisplayArtist artist={artist} />;
            }}
          />
        </DisplayBox>
      )}

      {albums && albums.items.length > 0 && (
        <DisplayBox>
          <DisplayBoxHeader>
            <DisplayBoxLabel>Albums</DisplayBoxLabel>
            <DisplayBoxPagination />
          </DisplayBoxHeader>
          <DisplayBoxItems<Album>
            itemsPerCol={1}
            pagedItems={albums}
            displayItem={(album) => {
              return <DisplayAlbum album={album} />;
            }}
          />
        </DisplayBox>
      )}

      {playlists && playlists.items.length > 0 && (
        <DisplayBox>
          <DisplayBoxHeader>
            <DisplayBoxLabel>Playlists</DisplayBoxLabel>
            <DisplayBoxPagination />
          </DisplayBoxHeader>
          <DisplayBoxItems<Playlist>
            itemsPerCol={1}
            pagedItems={playlists}
            displayItem={(playlist) => {
              return <DisplayPlaylist playlist={playlist} />;
            }}
          />
        </DisplayBox>
      )}
    </div>
  );
};

export default SearchResultsDisplay;
