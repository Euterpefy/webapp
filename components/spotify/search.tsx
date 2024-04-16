'use client';

import {
  SearchResult,
  SearchType,
  defaultSearchTypes,
} from '@/types/spotify/search';
import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { searchSpotify } from '@/api/spotify/search';
import { useAuthenticatedSession } from '@/hooks/use-authenticated-session';
import { Badge } from '@/components/ui/badge';

interface Props {
  loadOnChange?: boolean;
  genres?: string[];
  onResultChange?: (value: SearchResult | null) => void;
  searchTypes?: SearchType[];
  selectableTypes?: boolean;
}

const SpotifySearch: React.FC<Props> = ({
  loadOnChange = false,
  genres,
  onResultChange,
  searchTypes: initSearchTypes,
  selectableTypes = true,
}) => {
  const { data: session, status } = useAuthenticatedSession();

  const [searchKey, setSearchKey] = React.useState('imagine dragons');
  const [searchTypes, setSearchTypes] = React.useState<SearchType[]>(
    initSearchTypes ?? defaultSearchTypes
  );

  const [results, setResults] = React.useState<SearchResult | null>(null);

  const fetchSearchResults = async (): Promise<void> => {
    if (status === 'loading' || searchKey === '') {
      return;
    }
    if (!session || !session.token || !session.token.access_token) {
      toast.error(`Login session not found`);
      return;
    }
    const accessToken = session.token.access_token;
    if (accessToken) {
      const searchQuery =
        searchKey +
        (genres && genres.length > 0 ? ` genre:${genres.join(',')}` : '');
      try {
        const searchResults = await searchSpotify(accessToken, {
          q: searchQuery,
          type: searchTypes ?? defaultSearchTypes,
        });

        setResults(searchResults);
      } catch (e) {
        toast.error('Error searching');
      }
    }
  };

  React.useEffect(
    () => {
      if (onResultChange) {
        onResultChange(results);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results]
  );

  React.useEffect(
    () => {
      let timeout: ReturnType<typeof setTimeout> | null = null;

      if (loadOnChange) {
        timeout = setTimeout(async () => {
          fetchSearchResults().catch(() => {});
        }, 3000);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchKey, loadOnChange]
  );

  const handleSearchButtonClick = async (): Promise<void> => {
    try {
      if (!loadOnChange) {
        fetchSearchResults();
      }
    } catch (e) {
      console.error(e);
      toast.error(`Search error`);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center w-full max-w-lg space-x-2">
        <Input
          id="search-bar"
          className="rounded-lg"
          placeholder="Search..."
          type="search"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        {!loadOnChange && (
          <Button
            className="rounded-lg"
            type="submit"
            onClick={handleSearchButtonClick}
          >
            <Search className="w-4 h-4" />
          </Button>
        )}
      </div>
      {selectableTypes && (
        <div className="w-full flex flex-col gap-1 ml-1">
          <span className="font-medium text-xs uppercase text-foreground/80">
            Search Targets
          </span>
          <div className=" flex flex-wrap gap-1 items-center">
            {defaultSearchTypes.map((type) => (
              <Badge
                key={type}
                className="cursor-pointer"
                variant={searchTypes.includes(type) ? 'default' : 'outline'}
                onClick={() => {
                  if (searchTypes.includes(type)) {
                    setSearchTypes((prev) => prev.filter((x) => x !== type));
                  } else {
                    setSearchTypes((prev) => [...prev, type]);
                  }
                }}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
