// components/generate/selectors/genre.tsx

import useGenres from "@/hooks/spotify/genres";
import React from "react";
import { SelectorItem, type SeedSelectorProps } from ".";
import { Skeleton } from "@/components/ui/skeleton";
import { MAXSEEDS } from "@/config/spotify-api";

interface GenreSelectorProps {
  genreOptions?: string[];
}

const GenreSelector: React.FC<SeedSelectorProps & GenreSelectorProps> = ({
  accessToken,
  selected,
  setSelected,
  totalSeeds,
  genreOptions,
}) => {
  const { data: genres, isLoading, isError, error } = useGenres(accessToken);
  const genreList = Array.from(
    new Set([...(genreOptions ?? []), ...(genres ?? [])]),
  );

  if (isLoading) return <p>Loading genres...</p>;
  if (isError) return <p>Error loading genres: {error?.message}</p>;

  return (
    <div className="flex flex-wrap gap-2 items-center max-h-[60vh] overflow-y-auto">
      {!genreList ? (
        <>
          {Array.from(Array(10)).map((x, i) => (
            <Skeleton key={i} className="w-24 h-8" />
          ))}
        </>
      ) : (
        <>
          {genreList.map((genre, index) => (
            <SelectorItem
              key={index}
              selected={selected.includes(genre)}
              selectable={totalSeeds !== MAXSEEDS}
              onClick={() => {
                if (selected.includes(genre)) {
                  setSelected(selected.filter((g) => g !== genre));
                } else {
                  if (totalSeeds === MAXSEEDS) {
                    return;
                  }
                  setSelected((prev) => [...prev, genre]);
                }
              }}
            >
              {genre}
            </SelectorItem>
          ))}
        </>
      )}
    </div>
  );
};

export default GenreSelector;
