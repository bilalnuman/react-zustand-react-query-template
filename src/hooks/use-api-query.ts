"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { useApiStore } from "../store/use-api-store";
import { useEffect } from "react";

interface ApiQueryProps<T> {
  url: string;
  params?: Record<string, unknown>;
  queryKey?: unknown[];
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;
  persistKey?: string;
}

export const useApiQuery = <T>({
  url,
  params,
  queryKey,
  options,
  persistKey,
}: ApiQueryProps<T>) => {
  const { data: persistedData, setData } = useApiStore();

  const query = useQuery<T, Error>({
    queryKey: queryKey || [url],
    queryFn: async () => {
      const response = await apiClient.get(url, { params });
      return response.data;
    },
    initialData: persistKey ? (persistedData[persistKey] as T) : undefined,
    ...options,
  });

  useEffect(() => {
    if (persistKey && query.data) {
      setData(persistKey, query.data);
    }
  }, [persistKey, query.data, setData]);

  return query;
};
