'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import CoverImage from '@/components/spotify/cover-image';
import { Button } from '@/components/ui/button';
import { useFetchMoreItems } from '@/hooks/spotify/fetch-more';
import { useFetchPagination } from '@/hooks/spotify/fetch-pagination';
import { useAuthenticatedSession } from '@/hooks/use-authenticated-session';
import type { Playlist } from '@/types/spotify/playlist';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PlaylistProps {
  playlists: Playlist[];
  isLoading: boolean;
}

const TEST_LIMIT = 2;

const TestPage: React.FC = () => {
  const { status } = useSession();
  const [fetchMethod, setFetchMethod] = useState<string>('option-one'); // Use string type for fetchMethod

  return (
    <div className="flex justify-center">
      <div className="mt-4 mx-4 w-full max-w-[1028px] flex flex-col gap-2">
        <div>
          <RadioGroup
            defaultValue="option-one"
            value={fetchMethod}
            onValueChange={setFetchMethod}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Use Load More</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Use Pagination</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          {status === 'authenticated' &&
            (fetchMethod === 'option-one' ? (
              <PlaylistsLoadMore />
            ) : (
              <PlaylistsPaginated />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;

const PlaylistsLoadMore: React.FC = () => {
  const { data: session } = useAuthenticatedSession();
  const {
    data: playlists,
    hasMore,
    fetchMore,
    isLoading,
  } = useFetchMoreItems<Playlist>(
    session?.token?.access_token ?? '',
    `/users/${session?.user?.id}/playlists`,
    TEST_LIMIT
  );

  return (
    <>
      <div className="font-bold text-info">Use Load More</div>
      <Button
        size={'sm'}
        variant={'success'}
        disabled={!hasMore}
        onClick={() => {
          fetchMore();
        }}
      >
        Load More
      </Button>
      {renderPlaylists({
        playlists,
        isLoading,
      })}
    </>
  );
};

const PlaylistsPaginated: React.FC = () => {
  const { data: session } = useAuthenticatedSession();
  const {
    data: playlists,
    hasNext,
    hasPrev,
    isLoading,
    currentPage,
    totalPages,
    setPage,
  } = useFetchPagination<Playlist>(
    session?.token?.access_token ?? '',
    `/users/${session?.user?.id}/playlists`,
    TEST_LIMIT
  );

  return (
    <>
      <div className="font-bold text-info">Use Pagination</div>
      <div className="flex items-center gap-4">
        <Button
          size={'sm'}
          disabled={!hasPrev}
          onClick={() => {
            setPage(currentPage - 1);
          }}
        >
          Previous Page
        </Button>
        <div>
          {currentPage}/{totalPages}
        </div>
        <Button
          size={'sm'}
          disabled={!hasNext}
          onClick={() => {
            setPage(currentPage + 1);
          }}
        >
          Next Page
        </Button>
      </div>
      {renderPlaylists({
        playlists,
        isLoading,
      })}
    </>
  );
};

const renderPlaylists: React.FC<PlaylistProps> = ({ playlists }) => (
  <div className="flex flex-col gap-4">
    {playlists.map((playlist, index) => (
      <div key={index} className="flex items-center gap-4">
        <CoverImage
          size="md"
          images={
            playlist.images
              ? [playlist.images[0].url]
              : ['/spotify/default-cover.jpg']
          }
        />
        <div className="text-foreground">
          {playlist.name}
          <p className="text-xs text-foreground/50">
            {playlist.public ? 'Public' : 'Private'} • {playlist.tracks.total}{' '}
            tracks
          </p>
        </div>
      </div>
    ))}
  </div>
);
