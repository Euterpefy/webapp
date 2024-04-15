'use client';
import { useAuthenticatedSession } from '@/hooks/use-authenticated-session';
import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@/components/ui/select'; // Adjust import paths
import { addPlaylistItems } from '@/api/spotify/playlist';
import { Playlist, PlaylistTrack } from '@/types/spotify/playlist';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';
import CoverImage from '../spotify/cover-image';
import { Skeleton } from '../ui/skeleton';
import { fetchAllItems } from '@/api/spotify/fetch-all';
import { useFetchMoreItems } from '@/hooks/spotify/fetch-more';
import { cn } from '@/lib/utils';

interface Props {
  trackIds: string[];
}

const ImportToExistingPlaylist: React.FC<Props> = ({ trackIds }) => {
  const { data: session } = useAuthenticatedSession();

  const [selectedPlaylist, setSelectedPlaylist] =
    React.useState<Playlist | null>(null);

  const {
    data: playlists,
    fetchMore,
    hasMore,
    isLoading,
    status: playlistStatus,
  } = useFetchMoreItems<Playlist>(
    session?.token?.access_token ?? '',
    `/users/${session?.user?.id}/playlists`,
    5
  );

  const [selectedPlaylistId, setSelectedPlaylistId] = React.useState<
    string | null
  >(null);

  const handleSelectChange = (playlistId: string): void => {
    setSelectedPlaylistId(playlistId);
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist) {
      setSelectedPlaylist(playlist);
    }
  };

  const addToPlaylist = async (): Promise<void> => {
    if (!selectedPlaylist) {
      toast.error(`You have to select a playlist first`);
      return;
    }
    try {
      if (!session || !session.token || !session.user) {
        return;
      }

      const allTracks = await fetchAllItems<PlaylistTrack>(
        session.token.access_token,
        `/playlists/${selectedPlaylist.id}/tracks`
      );

      const allTracksIds = allTracks.map((t) => t.track.id);

      const addTracks = trackIds.filter((id) => !allTracksIds.includes(id));
      if (addTracks.length > 0) {
        await addPlaylistItems(
          session.token.access_token,
          selectedPlaylist.id,
          addTracks
        );

        const wasNotAdded = trackIds.length - addTracks.length;
        toast.info(`Tracks imported to playlist ${selectedPlaylist.name}`, {
          description: wasNotAdded
            ? `${wasNotAdded} overlapping tracks was not added`
            : ``,
        });
      } else {
        toast.warning(
          `Playlist ${selectedPlaylist.name} already have all of these tracks`
        );
      }
    } catch (e) {
      toast.error(`Failed to add tracks to playlist ${selectedPlaylist.name}`);
    }
  };

  const renderPlaylistSelector = (): JSX.Element => {
    if (isLoading) {
      return <Skeleton className="w-full h-8" />;
    }

    if (playlistStatus === 'success' && playlists) {
      return (
        <Select
          onValueChange={handleSelectChange}
          value={selectedPlaylistId ?? ''}
          disabled={playlistStatus !== 'success' || isLoading}
        >
          <SelectTrigger aria-label="Select a playlist">
            <SelectValue placeholder="Select a playlist">
              {selectedPlaylist
                ? `${selectedPlaylist.name} (${
                    selectedPlaylist.public ? 'Public' : 'Private'
                  })`
                : 'Select a playlist'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton />
            {playlists
              ? playlists.map((playlist) => (
                  <SelectItem
                    key={playlist.id}
                    value={playlist.id}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <CoverImage
                          size="sm"
                          images={
                            playlist.images
                              ? [playlist.images[0].url]
                              : ['/spotify/default-cover.jpg']
                          }
                        />
                      </div>
                      <div className="text-foreground">
                        {playlist.name}
                        <p className="text-xs text-foreground/50">
                          {playlist.public ? 'Public' : 'Private'} •{' '}
                          {playlist.tracks.total} tracks
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))
              : null}
            <Button
              size={'sm'}
              onClick={() => {
                fetchMore();
              }}
              disabled={playlistStatus !== 'success' || isLoading}
              className={cn('mx-4 my-2', !hasMore && 'hidden')}
            >
              <RefreshCcw size={24} />
              Load more
            </Button>
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
      );
    }

    if (playlistStatus === 'error') {
      return (
        <div className="w-full h-8 rounded-lg bg-secondary">
          Error getting your playlists...
        </div>
      );
    }

    return <Skeleton className="w-full h-8" />;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">{renderPlaylistSelector()}</div>
      <div className="flex items-center justify-start">
        <Button
          variant={'success'}
          size={'sm'}
          onClick={() => {
            addToPlaylist();
          }}
        >
          Import to Spotify Playlist
        </Button>
      </div>
    </div>
  );
};

export default ImportToExistingPlaylist;
