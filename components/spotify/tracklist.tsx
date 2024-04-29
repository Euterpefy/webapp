import type { Track } from '@/types/spotify/track';
import React from 'react';
import { Icons } from '../icons';
import { toast } from 'sonner';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useOnScreen from '@/hooks/use-on-screen';

interface Props {
  tracks: Track[];
  onTrackRemove?: (trackId: string) => void;
  hideIndex?: boolean;
}

const TrackList: React.FC<Props> = ({
  tracks,
  onTrackRemove,
  hideIndex = false,
}) => {
  const [currentAudioUrl, setCurrentAudioUrl] = React.useState<string | null>(
    null
  );
  const audioPlayer = React.useRef(new Audio());
  const [visibleTracks, setVisibleTracks] = React.useState<Track[]>([]);
  const [loadMore, setLoadMore] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const isListRefVisible = useOnScreen(listRef);

  React.useEffect(() => {
    setLoadMore(true);
  }, [isListRefVisible]);

  // Load initial tracks
  React.useEffect(() => {
    setVisibleTracks(tracks.slice(0, 10));
  }, [tracks]);

  // Handle loading more tracks
  React.useEffect(() => {
    if (loadMore && visibleTracks.length < tracks.length) {
      const nextTracks = tracks.slice(
        visibleTracks.length,
        visibleTracks.length + 10
      );
      setVisibleTracks((prevTracks) => [...prevTracks, ...nextTracks]);
      setLoadMore(false); // Reset trigger
    }
  }, [loadMore, visibleTracks, tracks]);

  React.useEffect(() => {
    const currentAudio = audioPlayer.current; // Capture the current value at the time of effect execution
    if (currentAudioUrl) {
      toast.success('Playing track preview...', {
        description: 'Preview content from Spotify',
      });
      currentAudio.src = currentAudioUrl;
      currentAudio.play().catch(() => {
        // console.error('Error playing the track:', error);
        toast.error('Error playing preview for the track');
      });
      // Set currentAudioUrl to null when the audio has finished playing
      currentAudio.addEventListener('ended', () => {
        setCurrentAudioUrl(null);
      });
    }

    // Use the captured value in the cleanup function
    return () => {
      currentAudio.pause();
    };
  }, [currentAudioUrl]);

  const handleTrackClick = (previewUrl: string | undefined): void => {
    if (audioPlayer.current.src) {
      audioPlayer.current.pause();
    }
    if (!previewUrl) {
      toast.warning(`Preview is not available for this track`);
      return;
    }
    if (currentAudioUrl === previewUrl) {
      setCurrentAudioUrl(null); // If the same track is clicked, stop it
    } else {
      setCurrentAudioUrl(previewUrl); // Set new URL to trigger the effect
    }
  };

  return (
    <div className="flex flex-col w-full gap-1 px-2 md:px-4">
      {visibleTracks.map((track, index) => (
        <div
          key={track.id}
          className="rounded-lg p-2 flex items-center justify-between hover:bg-secondary/80 cursor-pointer transition-colors ease-in-out relative"
          onClick={() => {
            handleTrackClick(track.preview_url);
          }}
        >
          {/* Track details */}
          <div className="flex items-center gap-2">
            {!hideIndex && (
              <div className="text-sm font-bold text-foreground/80">
                {index + 1}
              </div>
            )}
            <Image
              src={track.album.images[0].url}
              width={50}
              height={50}
              alt={track.name}
              className="rounded-sm"
            />
            <div className="flex flex-col">
              <div className="font-medium">{track.name}</div>
              <div className="text-foreground/80 text-xs">
                {track.artists.map((a) => a.name).join(', ')}
              </div>
            </div>
          </div>
          {/* Icons */}
          <div className="flex items-center gap-2">
            <Icons.spotify className="text-success" />

            {/* Conditional rendering of icons based on preview URL and visibility */}
            <div>
              {track.preview_url && currentAudioUrl === track.preview_url ? (
                <Pause size={24} className="p-1 rounded-md" />
              ) : (
                <Play
                  size={24}
                  className={cn(
                    'p-1 rounded-md',
                    !track.preview_url &&
                      'text-foreground/40 cursor-not-allowed'
                  )}
                />
              )}
            </div>
            {onTrackRemove && (
              <Icons.trash
                size={24}
                className="hover:bg-destructive p-1 rounded-md text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from bubbling to the track item
                  if (
                    track.preview_url &&
                    currentAudioUrl === track.preview_url
                  ) {
                    setCurrentAudioUrl(null); // Stop playing the track if it's currently playing
                  }
                  onTrackRemove(track.id); // Execute the removal function passed by the parent
                }}
              />
            )}
          </div>
        </div>
      ))}
      <div ref={listRef} />
    </div>
  );
};

export default TrackList;
