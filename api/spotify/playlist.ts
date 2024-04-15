// api/spotify/playlist.ts

import { spotifyInstance } from '@/config/spotify-api';
import { PagedResponse } from '@/types/spotify/pagination';
import { NewPlaylist, Playlist, PlaylistTrack } from '@/types/spotify/playlist';
import { HttpStatusCode } from 'axios';

const fetchUserPlaylists = async (
  accessToken: string,
  userId: string,
  limit = 50,
  offset = 0
): Promise<PagedResponse<Playlist>> => {
  try {
    const response = await spotifyInstance(accessToken).get(
      `/users/${userId}/playlists?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch playlists');
  }
};

const fetchPlaylist = async (
  accessToken: string,
  playlistId: string
): Promise<Playlist> => {
  const response = await spotifyInstance(accessToken).get(
    `/playlists/${playlistId}`
  );
  return response.data;
};

const fetchPlaylistTracks = async (
  accessToken: string,
  playlistId: string
): Promise<PagedResponse<PlaylistTrack>> => {
  const response = await spotifyInstance(accessToken).get(
    `/playlists/${playlistId}/tracks`
  );
  return response.data;
};

const createPlaylist = async (
  accessToken: string,
  userId: string,
  newPlaylist: NewPlaylist
): Promise<Playlist> => {
  const response = await spotifyInstance(accessToken).post(
    `/users/${userId}/playlists`,
    newPlaylist
  );
  return response.data;
};

const BATCH_SIZE = 100;

/**
 * Adds items to a Spotify playlist, handling more than 100 items by batching.
 *
 * @param accessToken - The access token for authentication with the Spotify API.
 * @param playlistId - The ID of the playlist to which tracks are being added.
 * @param trackIds - An array of Spotify track IDs to add to the playlist.
 * @returns - A promise that resolves to the last snapshot ID received from Spotify.
 */
const addPlaylistItems = async (
  accessToken: string,
  playlistId: string,
  trackIds: string[]
): Promise<string> => {
  let lastSnapshotId = '';

  for (let i = 0; i < trackIds.length; i += BATCH_SIZE) {
    const batch = trackIds.slice(i, i + BATCH_SIZE);
    const response = await spotifyInstance(accessToken).post(
      `/playlists/${playlistId}/tracks`,
      {
        playlist_id: playlistId,
        uris: batch.map((id) => `spotify:track:${id}`),
      }
    );
    if (!(response.status === HttpStatusCode.Ok)) {
      throw new Error(`Failed to add tracks: ${response.statusText}`);
    }
    const data: { snapshot_id: string } = await response.data;
    lastSnapshotId = data.snapshot_id; // Update the last known snapshot ID
  }

  return lastSnapshotId;
};

export {
  fetchUserPlaylists,
  fetchPlaylist,
  fetchPlaylistTracks,
  createPlaylist,
  addPlaylistItems,
};
