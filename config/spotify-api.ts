import axios, { type AxiosInstance } from "axios";

const BASE_URL = "https://api.spotify.com/v1";

export const MAXSEEDS = 5;

export const spotifyInstance = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
