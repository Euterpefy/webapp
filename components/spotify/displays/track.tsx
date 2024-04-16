import React from 'react';
import { Track } from '@/types/spotify/track';
import { DisplayFooter, DisplayName } from '.';
import Image from 'next/image';

interface Props {
  track: Track;
}
const DisplayTrack: React.FC<Props> = ({ track }) => {
  const { album, artists, name, id } = track;
  const imageUrl = album.images[0]?.url ?? '/spotify/default-cover.jpg';
  return (
    <div key={id} className="flex items-center gap-2">
      <div className="flex-none w-12">
        {/* Fixed width of 48px (w-12) */}
        <Image
          src={imageUrl}
          alt="track image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // optional
          className="rounded-md aspect-square"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <DisplayName className="line-clamp-1">{name}</DisplayName>
        <DisplayFooter className="line-clamp-1">
          {artists.map((a) => a.name).join(',')}
        </DisplayFooter>
      </div>
    </div>
  );
};

export default DisplayTrack;
