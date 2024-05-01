"use client";

import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { fetchRecommendations } from "@/lib/api/spotify/recommendations";
import { Icons } from "@/components/icons";
import GeneratedPlaylist from "../../_components/playlist";
import ArtistSelector from "../../_components/selectors/artist";
import TrackSelector from "../../_components/selectors/track";
import PreferenceSliders from "../../_components/selectors/preference-sliders";
import SeedsProgressBar from "../../_components/seeds-count";
import GenreSelector from "../../_components/selectors/genre";
import type { Track, TrackArtist } from "@/types/spotify/track";
import type { Artist } from "@/types/spotify/artist";
import { fetchUserTopItemsPages } from "@/lib/api/spotify/user-top-items";
import { MAXSEEDS } from "@/config/spotify-api";
import { Skeleton } from "@/components/ui/skeleton";

const FavMixerStepper = (): JSX.Element => {
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = React.useState(1); // State to track the current step
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedArtistIds, setSelectedArtistIds] = React.useState<string[]>(
    [],
  );
  const [selectedTrackIds, setSelectedTrackIds] = React.useState<string[]>([]);

  const [genreOptions, setGenreOptions] = React.useState<string[]>([]);
  const [topArtists, setTopArtists] = React.useState<Artist[]>([]);

  React.useEffect(() => {
    if (session?.token) {
      fetchUserTopItemsPages<Artist>(
        session.token.access_token,
        "artists",
        "medium_term",
        50,
        0,
        2,
      )
        .then((responseData) => {
          setGenreOptions(
            Array.from(
              new Set([...responseData.flatMap((item) => item.genres)]),
            ),
          );
          setTopArtists(responseData);
        })
        .catch((e) => {
          // handle error fetching user's top items
        });
    }
  }, [session]);

  const [artistOptions, setArtistOptions] = React.useState<TrackArtist[]>([]);
  const [tracksOptions, setTrackOptions] = React.useState<Track[]>([]);

  const [recommendedTracks, setRecommendedTracks] = React.useState<Track[]>([]);

  const totalSeeds =
    selectedGenres.length + selectedArtistIds.length + selectedTrackIds.length;

  const [advancedPreferences, setAdvancedPreferences] = React.useState<
    Record<string, number>
  >({});

  // Function to go to the next step
  const handleNext = (): void => {
    if (currentStep < 4) {
      if (totalSeeds === 5) {
        setCurrentStep(4);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  // Function to go to the previous step
  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toStep2 = async (): Promise<void> => {
    try {
      if (!session?.token) {
        return;
      }

      const filteredTopArtists = topArtists.filter((artist) => {
        return artist.genres.some((genre) => selectedGenres.includes(genre));
      });

      const seedGenres = selectedGenres;
      const seedArtists = filteredTopArtists
        .slice(0, MAXSEEDS - selectedGenres.length)
        .map((artist) => artist.id);

      const responseData = await fetchRecommendations(
        session.token.access_token,
        {
          seed_genres: seedGenres,
          seed_artists: seedArtists,
          limit: 100,
        },
      );

      const uniqueArtists: Record<string, TrackArtist> = {};

      filteredTopArtists.forEach((artist) => {
        uniqueArtists[artist.id] = artist as TrackArtist;
      });

      responseData.tracks.forEach((track) => {
        track.artists.forEach((artist) => {
          uniqueArtists[artist.id] = artist;
        });
      });

      setArtistOptions(Object.values(uniqueArtists));
      setTrackOptions(responseData.tracks);
    } catch (e) {
      toast.error(`Failed to load artist options`);
    }
  };

  const toStep3 = async (): Promise<void> => {
    try {
      if (!session?.token) {
        return;
      }
      const responseData = await fetchRecommendations(
        session.token.access_token,
        {
          seed_genres: selectedGenres,
          seed_artists: selectedArtistIds,
          limit: 100,
          min_popularity: 50,
        },
      );

      setTrackOptions((prev) =>
        Array.from(new Set([...prev, ...responseData.tracks])),
      );
    } catch (e) {
      console.log(e);
      toast.error(`Failed to load track options`);
    }
  };

  const generateTracks = async (): Promise<void> => {
    try {
      if (!session?.token) {
        toast.error(`Login session not found.`);
        return;
      }

      const res = await fetchRecommendations(session.token.access_token, {
        seed_genres: selectedGenres,
        seed_artists: selectedArtistIds,
        seed_tracks: selectedTrackIds,
        limit: 100,
        min_popularity: 30,
        ...advancedPreferences, // Merge in advanced preferences dynamically
      });

      setRecommendedTracks(res.tracks);
      setCurrentStep(0);
    } catch (e) {
      // toast.error(`${e}`);
    }
  };

  const startOver = (): void => {
    setSelectedGenres([]);
    setSelectedArtistIds([]);
    setSelectedTrackIds([]);
    setArtistOptions([]);
    setTrackOptions([]);
    setCurrentStep(1);
  };

  const NextButton = ({
    onClick,
  }: {
    onClick?: () => Promise<void>;
  }): JSX.Element => (
    <Button
      onClick={() => {
        if (onClick) {
          onClick()
            .then(() => {
              handleNext();
            })
            .catch((e) => {});
        } else {
          handleNext();
        }
      }}
      // className={cn(totalSeeds === 5 && 'hidden')}
      disabled={totalSeeds === 0}
      size={"sm"}
    >
      Next
    </Button>
  );

  const GenerateButton = (): JSX.Element => (
    <Button
      variant={"success"}
      disabled={
        totalSeeds === 0 ||
        (selectedArtistIds.length === 0 && selectedTrackIds.length === 0)
      }
      size={"sm"}
      onClick={() => {
        generateTracks().catch((e) => {});
      }}
      className="gap-2"
    >
      <Icons.spotify />
      Generate playlist
    </Button>
  );

  const PreviousButton = (): JSX.Element => (
    <Button onClick={handlePrevious} variant="outline" size={"sm"}>
      Previous
    </Button>
  );

  const renderStep = (): JSX.Element => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col gap-2">
            <div>
              <Button onClick={startOver} variant="outline" size={"sm"}>
                Start Over
              </Button>
            </div>
            <GeneratedPlaylist options={recommendedTracks} />
          </div>
        );
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Select Genres</CardTitle>
              <CardDescription>
                Choose your preferred music genres.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Render genre selectors here */}
              {genreOptions.length === 0 ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <GenreSelector
                  accessToken={session?.token?.access_token ?? ""}
                  selected={selectedGenres}
                  setSelected={setSelectedGenres}
                  totalSeeds={totalSeeds}
                  genreOptions={genreOptions}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between flex-col-reverse gap-2 md:flex-row">
              <NextButton onClick={toStep2} />
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Select Artists</CardTitle>
              <CardDescription>
                Choose artists based on selected genres.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Render artist selectors here */}
              <ArtistSelector
                options={artistOptions}
                selected={selectedArtistIds}
                setSelected={setSelectedArtistIds}
                totalSeeds={totalSeeds}
              />
            </CardContent>
            <CardFooter className="flex justify-between flex-col-reverse gap-2 md:flex-row">
              <div className="flex gap-2 items-center">
                <PreviousButton />
                <Button onClick={startOver} variant="outline" size={"sm"}>
                  Start Over
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <GenerateButton />
                <NextButton onClick={toStep3} />
              </div>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Select Tracks</CardTitle>
              <CardDescription>
                Choose tracks from selected artists.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Render track selectors here */}
              <TrackSelector
                options={tracksOptions}
                selected={selectedTrackIds}
                setSelected={setSelectedTrackIds}
                totalSeeds={totalSeeds}
              />
            </CardContent>
            <CardFooter className="flex justify-between flex-col-reverse gap-2 md:flex-row">
              <div className="flex items-center gap-2">
                <PreviousButton />
                <Button onClick={startOver} variant="outline" size={"sm"}>
                  Start Over
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <GenerateButton />
                <NextButton />
              </div>
            </CardFooter>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Tracks preferences</CardTitle>
              <CardDescription>Adjust your track preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Render track selectors here */}
              <PreferenceSliders
                onValuesChange={(preferences) => {
                  setAdvancedPreferences(preferences);
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between flex-col-reverse gap-2 md:flex-row">
              <div className="flex items-center gap-2">
                <PreviousButton />
                <Button onClick={startOver} variant="outline" size={"sm"}>
                  Start Over
                </Button>
              </div>
              <GenerateButton />
            </CardFooter>
          </Card>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <>
      {currentStep > 0 && <SeedsProgressBar curSeeds={totalSeeds} />}
      <div className="relative">
        {renderStep()}
        <Icons.spotify className="absolute top-0 right-0" />
      </div>
    </>
  );
};

export default FavMixerStepper;
