import { useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { spotifyInstance } from '@/config/spotify-api';
import { AxiosError } from 'axios';
import { PagedResponse } from '@/types/spotify/pagination';

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
  status: 'loading' | 'error' | 'success' | 'idle';
}

function useFetchPagination<T>(
  accessToken: string,
  initialUrl: string,
  limit: number = 20
): FetchPaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<(T[] | null)[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPage = async (page: number) => {
    const offset = (page - 1) * limit;
    const url = `${initialUrl}?limit=${limit}&offset=${offset}`;
    try {
      const response = await spotifyInstance(accessToken).get<PagedResponse<T>>(
        url
      );
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

  const { data, error, isLoading, status } = useQuery<T[], Error>(
    ['fetchPagination', accessToken, initialUrl, limit, currentPage],
    () => fetchPage(currentPage),
    {
      keepPreviousData: true,
    }
  );

  const setPage = (page: number) => {
    if (pages[page - 1] === null) {
      fetchPage(page);
    }
    setCurrentPage(page);
  };

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return {
    data: pages[currentPage - 1] || [],
    totalPages,
    currentPage,
    setPage,
    fetchPage,
    hasNext,
    hasPrev,
    error,
    isLoading,
    status,
  };
}

export { useFetchPagination };
