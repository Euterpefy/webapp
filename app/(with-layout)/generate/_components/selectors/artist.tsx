// components/generate/selectors/item-selector.tsx

import React from 'react';
import { type ItemsSelectorProps, SelectorItem } from '.';

import type { TrackArtist } from '@/types/spotify/track';
import { MAXSEEDS } from '@/config/spotify-api';

const ArtistSelector: React.FC<ItemsSelectorProps<TrackArtist>> = ({
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
          {option.name}
        </SelectorItem>
      ))}
    </div>
  );
};

export default ArtistSelector;
