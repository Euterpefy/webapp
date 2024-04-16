'use client';
import React from 'react';

import type { SearchResult } from '@/types/spotify/search';
import SpotifySearch from '@/components/spotify/search';
import { Label } from '@/components/ui/label';

import SearchResultsDisplay from '@/components/spotify/display-results';

const SearchPage = () => {
  const [results, setResults] = React.useState<SearchResult | null>(null);

  const resultsRef = React.useRef<SearchResult | null>(null);

  React.useEffect(() => {
    // Update the ref whenever the results state changes
    resultsRef.current = results;
  }, [results]);

  React.useEffect(() => {
    // Load the results from the ref on component mount
    if (resultsRef.current) {
      setResults(resultsRef.current);
    }
  }, []);

  // eslint-disable-next-line jsdoc/require-jsdoc
  function hasResults(): boolean {
    return (
      ((results?.albums && results.albums.items.length > 0) ||
        (results?.artists && results.artists.items.length > 0) ||
        (results?.tracks && results.tracks.items.length > 0) ||
        (results?.playlists && results.playlists.items.length > 0)) ??
      false
    );
  }

  return (
    <div className="flex justify-center">
      <div className="mt-4 px-4 w-full max-w-[1028px] flex flex-col gap-2">
        <div className="text-info text-3xl font-bold">Search Page</div>
        <div>
          <SpotifySearch loadOnChange={true} onResultChange={setResults} />
        </div>
        {results && (
          <div>
            {!hasResults() ? (
              <Label>No results found</Label>
            ) : (
              <SearchResultsDisplay results={results} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
