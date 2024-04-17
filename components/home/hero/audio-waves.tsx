'use client';

import { Icons } from '@/components/icons';
import AudioWaveform from '@/components/spotify/waveforms';
import fetchUserTopItems from '@/lib/api/spotify/user-top-items';
import { Track } from '@/types/spotify/track';
import { useSession } from 'next-auth/react';
import React from 'react';

const HomePageAudioWaves = () => {
  const [audioUrl, setAudioUrl] = React.useState(
    'https://p.scdn.co/mp3-preview/f6f9512f66f19e8244b7ee26908a87c41b2a80ab?cid=cfe923b2d660439caf2b557b21f31221'
  );
  const [userTopTrack, setUserTopTrack] = React.useState<Track | null>(null);

  const { data: session, status } = useSession();
  React.useEffect(() => {
    if (status === 'authenticated' && session && session.token) {
      fetchUserTopItems<Track>(
        session.token.access_token ?? '',
        'tracks',
        'long_term'
      )
        .then((response) => {
          const trackWithPreview = response.items.find(
            (track) => track.preview_url !== null
          );
          setUserTopTrack(trackWithPreview ?? null);
        })
        .catch();
    }
  }, [session, status]);

  React.useEffect(() => {
    if (userTopTrack && userTopTrack.preview_url) {
      setAudioUrl(userTopTrack.preview_url);
    }
  }, [userTopTrack]);

  return (
    <>
      <AudioWaveform
        url={audioUrl}
        className="absolute bottom-0 left-0 right-0" // Position at the bottom
      />
      {userTopTrack && (
        <div className="absolute bottom-10 right-0 text-end font-bold text-sm text-white/70 px-2 py-1">
          <div className="w-fit flex items-center gap-2">
            <Icons.spotify size={20} />
            {userTopTrack.name} -{' '}
            {userTopTrack.artists.map((a) => a.name).join(', ')}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePageAudioWaves;
