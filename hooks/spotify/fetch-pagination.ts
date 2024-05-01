import { useState } from "react";
import { useQuery } from "react-query";
import { spotifyInstance } from "@/config/spotify-api";
import { type AxiosError } from "axios";
import { type PagedResponse } from "@/types/spotify/pagination";

interface FetchPaginationReturn<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  fetchPage: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  error: Error | null;
  isLoading: boolean;
  status: "loading" | "error" | "success" | "idle";
}

/**
 * A custom hook to fetch paginated data from an API using the provided URL.
 * @param accessToken - The access token used for authentication.
 * @param initialUrl - The initial URL used to fetch data.
 * @param limit - The number of items per page.
 * @returns An object containing pagination data and controls.
 */
function useFetchPagination<T>(
  accessToken: string,
  initialUrl: string,
  limit: number = 20,
): FetchPaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<Array<T[] | null>>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPage = async (page: number): Promise<T[]> => {
    const offset = (page - 1) * limit;
    const url = `${initialUrl}?limit=${limit}&offset=${offset}`;
    try {
      const response =
        await spotifyInstance(accessToken).get<PagedResponse<T>>(url);
      setTotalPages(Math.ceil(response.data.total / limit));
      setPages((prevPages) => {
        const newPages = [...prevPages];
        newPages[page - 1] = response.data.items;
        return newPages;
      });
      return response.data.items;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  };

  const { error, isLoading, status } = useQuery<T[], Error>(
    ["fetchPagination", accessToken, initialUrl, limit, currentPage],
    async () => await fetchPage(currentPage),
    {
      keepPreviousData: true,
    },
  );

  const setPage = (page: number): void => {
    if (pages[page - 1] === null) {
      fetchPage(page).catch((e) => {});
    }
    setCurrentPage(page);
  };

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return {
    data: pages[currentPage - 1] ?? [],
    totalPages,
    currentPage,
    setPage,
    fetchPage: (pageNo) => {
      fetchPage(pageNo).catch((e) => {});
    },
    hasNext,
    hasPrev,
    error,
    isLoading,
    status,
  };
}

export { useFetchPagination };
