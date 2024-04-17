'use client';
import React from 'react';
import CallToAction from './call-to-action';
import { rubikFont } from '@/styles/fonts';
import AudioWaveform from '../../spotify/waveforms';
import { Icons } from '@/components/icons';
import { useSession } from 'next-auth/react';
import { Track } from '@/types/spotify/track';
import fetchUserTopItems from '@/lib/api/spotify/user-top-items';

const HeroSection = () => {
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
    <section
      className="relative h-[600px] justify-center"
      style={{
        backgroundImage: `url('/site/bg2.png')`,
        backgroundSize: 'cover', // Cover the entire section
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
      }}
    >
      <div className="p-8 flex flex-col justify-center ml-0 sm:ml-auto mr-0 sm:mr-12 items-center sm:items-end h-full gap-4 max-w-[600px]">
        <p
          className={`text-5xl font-bold text-center sm:text-end text-white backdrop-blur-sm rounded-lg p-2 ${rubikFont.className}`}
        >
          Generate Spotify playlists based on your mood within seconds
        </p>
        <CallToAction />
      </div>
      <AudioWaveform
        url={audioUrl}
        className="absolute bottom-0 left-0 right-0" // Position at the bottom
      />
      <div className="absolute top-0 right-0 mt-4 mr-4 text-end font-bold text-success">
        <div className="w-fit flex items-center gap-2">
          <Icons.spotify size={24} />
          Powered by Spotify API
        </div>
      </div>
      {userTopTrack && (
        <div className="absolute bottom-10 right-0 text-end font-bold text-sm text-white/70 px-2 py-1">
          <div className="w-fit flex items-center gap-2">
            <Icons.spotify size={20} />
            {userTopTrack.name} -{' '}
            {userTopTrack.artists.map((a) => a.name).join(', ')}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
