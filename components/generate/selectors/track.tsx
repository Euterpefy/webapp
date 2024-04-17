// components/generate/selectors/item-selector.tsx

import React from 'react';
import { type ItemsSelectorProps, SelectorItem } from '.';

import { MAXSEEDS } from '../stepper';
import { Track } from '@/types/spotify/track';
import Image from 'next/image';
import { Icons } from '@/components/icons';

const TrackSelector: React.FC<ItemsSelectorProps<Track>> = ({
  options,
  selected,
  setSelected,
  totalSeeds,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-h-[60vh] overflow-y-auto">
      {options.map((option, index) => (
        <SelectorItem
          key={index}
          selected={selected.includes(option.id)}
          selectable={totalSeeds !== MAXSEEDS}
          onClick={() => {
            if (selected.includes(option.id)) {
              setSelected(selected.filter((item) => item !== option.id));
            } else {
              if (totalSeeds === MAXSEEDS) {
                return;
              }
              setSelected((prev) => [...prev, option.id]);
            }
          }}
        >
          <div className="relative flex items-center gap-2 h-12">
            <Icons.spotify className="absolute top-0 right-[-20px] text-success" />
            <Image
              src={option.album.images[0].url}
              width={45}
              height={45}
              alt={option.name}
              className="rounded-sm"
            />
            <div className="flex flex-col max-w-36">
              <div className="font-medium truncate text-ellipsis">
                {option.name}
              </div>
              <div className="text-xs truncate text-ellipsis">
                {option.artists.map((a) => a.name).join(', ')}
              </div>
            </div>
          </div>
        </SelectorItem>
      ))}
    </div>
  );
};

export default TrackSelector;
