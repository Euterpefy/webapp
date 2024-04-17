import React from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Track } from '@/types/spotify/track';
import TrackList from '../spotify/tracklist';

import ImportPlaylistDialog from './import-playlist-dialog';

interface Props {
  options: Track[];
}
const GeneratedPlaylist: React.FC<Props> = ({ options }) => {
  const [recommendedTracks, setRecommendedTracks] =
    React.useState<Track[]>(options);

  return (
    <div>
      <Card className="mb-4 ">
        <CardHeader className="p-4 md:p-6 sticky top-[65px] z-20 bg-secondary">
          <CardTitle>Generated Playlist</CardTitle>
          <CardDescription>
            This playlist is generated based on your selected preferences
            <br />
            <span>Total: {recommendedTracks.length} tracks</span>
          </CardDescription>
          <div className="flex items-center gap-4 mt-2">
            <ImportPlaylistDialog
              trackIds={recommendedTracks.map((track) => track.id)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-0 relative">
          <TrackList
            hideIndex={true}
            tracks={recommendedTracks}
            onTrackRemove={(trackId: string) => {
              setRecommendedTracks((prev) =>
                prev.filter((t) => t.id !== trackId)
              );
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratedPlaylist;
